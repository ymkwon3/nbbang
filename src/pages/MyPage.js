import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Flex, Grid, Image, Text } from "../elements";
import { actionCreator as userPageActions } from "../redux/modules/userpage";

import { Desktop } from "../shared/Responsive";

import {
  eatCategory,
  buyCategory,
  price,
  calendar,
  address,
  content,
} from "../image";

import moment from "moment";
import "moment/locale/ko";
import Modal from "../shared/Modal";
import { secondaryColor } from "../shared/color";
import UserInfo from "../components/mypage/UserInfo";
import UserUpdate from "../components/mypage/UserUpdate";
import PersonalReviews from "../components/modal/PersonalReviews";

const MyPage = (props) => {
  const dispatch = useDispatch();
  // 유저페이지 리덕스 모듈에서 불러오는 유저정보, 나의 공구, 참여완료된 공구, 좋아요한 공구
  const userInfo = useSelector(state => state.userpage.userInfo);
  const myList = useSelector(state => state.userpage.myList);
  const joinList = useSelector(state => state.userpage.joinList);
  const likeList = useSelector(state => state.userpage.likeList);
  
  const loginUserId = useSelector(state => state.user.userInfo.userId);
  const userId = parseInt(useParams().userId);
  const [isUpdate, setIsUpdate] = React.useState(false);

  const isDesktop = Desktop(0);

  // 모달상태관리
  const [modal, setModal] = React.useState(false);
  // 모달내용관리
  const modalRef = React.useRef(null);

  const imageStyle = {
    border: "1px solid #eee",
    maxWidth: "300px",
    width: "100%",
    maxHeight: "300px",
    height: "100vh",
  };
  const buttonStyle = {
    maxWidth: "240px",
    width: "20vw",
    minWidth: "80px",
    maxHeight: "60px",
    height: "5vw",
    minHeight: "30px",
    marginBottom: "20px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    borderRadius: "30px",
    fontSize: isDesktop === undefined ? "24px" : "16px",
    fontWeight: "700",
    color: "rgba(0, 0, 0, 0.5)",
  };

  const checkedStyle = {
    maxWidth: "240px",
    width: "20vw",
    minWidth: "80px",
    maxHeight: "60px",
    height: "5vw",
    minHeight: "30px",
    marginBottom: "20px",
    border: "2px solid #FF5C00",
    borderRadius: "30px",
    fontSize: isDesktop === undefined ? "24px" : "16px",
    fontWeight: "700",
    color: "#FF5C00",
  };

  // 게시물 타입 선택 값 : mine, join, like
  const [postType, setPostType] = React.useState("mine");
  const postList =
    postType === "mine" ? myList : postType === "join" ? joinList : likeList;
  const changeType = (type) => {
    setPostType(type);
  };

  React.useEffect(() => {
    dispatch(userPageActions.getUserPageDB({ userId }));
    setIsUpdate(false);
  }, [userId]);

  return (
    <>
      <Flex
        styles={{
          flexDirection: "column",
          height: "100%",
          overflow: "scroll",
          justifyContent: "start",
          paddingTop: isDesktop === undefined ? "5vh" : 0,
        }}
      >
        <Flex
          styles={{
            width: "100%",
            maxWidth: "800px",
            padding: "20px",
            position: "relative",
          }}
        >
          {!isUpdate ? (
            <UserInfo
              isUpdate={isUpdate}
              _setIsUpdate={setIsUpdate}
              userInfo={userInfo}
              loginUserId={loginUserId}
              userId={userId}
              myListLen={myList.length}
            ></UserInfo>
          ) : (
            <UserUpdate
              _setIsUpdate={setIsUpdate}
              userInfo={userInfo}
            ></UserUpdate>
          )}
        </Flex>

        <Flex
          styles={{
            maxWidth: "960px",
            width: "90%",
            minHeight: "1px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            margin: "10px 0 30px",
          }}
        ></Flex>

        <Flex
          styles={{
            width: "80%",
            maxWidth: "960px",
            justifyContent: "space-around",
          }}
        >
          <Button
            _onClick={() => changeType("mine")}
            styles={postType === "mine" ? checkedStyle : buttonStyle}
          >
            {loginUserId === userId ? "나의 공구" : "모집 공구"}
          </Button>
          <Button
            _onClick={() => changeType("join")}
            styles={postType === "join" ? checkedStyle : buttonStyle}
          >
            참여 공구
          </Button>
          <Button
            _onClick={() => changeType("like")}
            styles={postType === "like" ? checkedStyle : buttonStyle}
          >
            찜한 공구
          </Button>
        </Flex>
        {postList.length === 0 ? (
          <Flex>게시물이 없습니다!</Flex>
        ) : (
          <Grid
            styles={{
              width: "80%",
              maxWidth: "960px",
            }}
          >
            {/* 이 부분에서 불러온 게시물 맵을 돌려야함 */}
            {postList.map(v => (
              <Image
                key={v.postId}
                styles={imageStyle}
                shape="post"
                src={v.image}
                _onClick={() => {
                  setModal(true);
                  modalRef.current = v;
                }}
              >
                {v.isDone === 1
                  ? "완료 공구"
                  : v.isDone === 2
                  ? "미완료 공구"
                  : null}
              </Image>
            ))}
          </Grid>
        )}
        <Flex styles={{ minHeight: "10vh" }}></Flex>
      </Flex>
      {modal && (
        <Modal close={() => setModal(false)}>
          <PostModal v={modalRef.current} />
        </Modal>
      )}
      {/* <Modal close={() => setModal(false)}>
        <PersonalReviews />
      </Modal> */}
    </>
  );
};

const PostModal = ({ v }) => {
  const iconStyles = {
    width: "24px",
    height: "24px",
    marginRight: "10px",
  };
  const valueStyles = {
    fontSize: "16px",
    fontWeight: "400",
  };
  return (
    <Flex
      styles={{
        maxWidth: "600px",
        width: "80vw",
        maxHeight: "90vh",
        backgroundColor: "#fff",
        flexDirection: "column",
        justifyContent: "start",
        borderRadius: "10px",
        overflow: "scroll",
      }}
      _onClick={(e) => e.stopPropagation()}
    >
      <Flex styles={{ flexDirection: "column", padding: "25px" }}>
        <Flex styles={{ marginBottom: "10px" }}>
          <Flex
            styles={{
              width: "fit-content",
              flex: 3,
              justifyContent: "start",
            }}
          >
            <Image
              styles={{
                width: "50px",
                height: "50px",
              }}
              src={v.userImage}
            />
            <Text
              styles={{
                marginLeft: "10px",
                fontWeight: "700",
                fontSize: "20px",
                fontFamily: "Cafe24Ssurround",
              }}
            >
              {v.writer}
            </Text>
          </Flex>

          <Flex
            styles={{
              width: "60px",
              height: "30px",
              borderRadius: "20px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            {v.headList.length}/{v.headCount}
          </Flex>
        </Flex>
        <Flex styles={{ justifyContent: "start", marginBottom: "6px" }}>
          {/* <img alt="price" src={priceGray} style={{ marginRight: "5px" }}></img> */}
          {v.category === "eat" ? (
            <img alt="eat" src={eatCategory} style={iconStyles}></img>
          ) : (
            <img alt="buy" src={buyCategory} style={iconStyles}></img>
          )}
          <Text
            styles={{
              fontSize: "16px",
              fontWeight: "600",
              color: secondaryColor,
            }}
          >
            {v.type}
          </Text>
        </Flex>
        <Flex styles={{ justifyContent: "start" }}>
          <Text
            styles={{
              fontSize: "28px",
              fontWeight: "800",
            }}
          >
            {v.title}
          </Text>
        </Flex>
      </Flex>
      <Image shape="rectangle" src={v.image} />
      <Flex styles={{ flexDirection: "column", padding: "25px" }}>
        <Flex
          styles={{
            flexDirection: "column",
            gap: "25px",
            alignItems: "flex-start",
          }}
        >
          <Flex styles={{ justifyContent: "space-between" }}>
            <Flex styles={{ flex: 1, justifyContent: "start" }}>
              <img alt="price" src={price} style={iconStyles}></img>
              <Text styles={valueStyles}>
                {v.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              </Text>
            </Flex>
            <Flex styles={{ flex: 1, justifyContent: "start" }}>
              <img alt="calendar" src={calendar} style={iconStyles}></img>
              <Text styles={valueStyles}>
                {moment(v.endTime).format("MM-DD")} 까지
              </Text>
            </Flex>
          </Flex>
          <Flex styles={{ justifyContent: "start" }}>
            <img alt="address" src={address} style={iconStyles}></img>
            <Text styles={valueStyles}>{v.address}</Text>
          </Flex>
          <Flex styles={{ justifyContent: "start" }}>
            <img alt="content" src={content} style={iconStyles}></img>
            <Text styles={valueStyles}>{v.content}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MyPage;
