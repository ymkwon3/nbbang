import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Flex, Grid, Image, Text } from "../elements";
import { actionCreator as userPageActions } from "../redux/modules/userpage";
import { actionCreator as userActions } from "../redux/modules/user";

import { notify } from "../components/ToastMessage";
import { Desktop } from "../shared/Responsive";

import {
  trash,
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

const MyPage = props => {
  const dispatch = useDispatch();
  // 유저페이지 리덕스 모듈에서 불러오는 유저정보, 나의 공구, 참여완료된 공구, 좋아요한 공구
  const userInfo = useSelector(state => state.userpage.userInfo);
  const myList = useSelector(state => state.userpage.myList);
  const joinList = useSelector(state => state.userpage.joinList);
  const likeList = useSelector(state => state.userpage.likeList);
  const userId = useParams().userId;
  const isDesktop = Desktop(0);

  // 이미지 미리보기
  const [preview, setPreview] = React.useState(null);
  // 모달상태관리
  const [modal, setModal] = React.useState(false);
  // 모달내용관리
  const modalRef = React.useRef(null);

  const imageStyle = {
    borderRadius: "30px",
    border: "1px solid #dbdbdb",
    maxWidth: "300px",
    width: "100%",
    maxHeight: "300px",
    height: "100%",
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
  const changeType = type => {
    setPostType(type);
  };

  React.useEffect(() => {
    dispatch(userPageActions.getUserPageDB({ userId }));
  }, []);

  const setUserImage = e => {
    //사진이 변경되었으면 미리보기, 사진 데이터 저장
    if (e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      const formData = new FormData();
      formData.append("userImage", e.target.files[0]);
      // 유저이미지 알림 필요할지도???
      notify("success", "프로필 사진이 변경되었습니다", 2000, "top-right");
      dispatch(userActions.postUserImageDB(formData));
    }
  };

  return (
    <>
      <Flex
        styles={{
          flexDirection: "column",
          height: "100%",
          overflow: "scroll",
          justifyContent: "start",
          paddingTop: "10vh",
        }}
      >
        <Flex styles={{ width: "80%", maxWidth: "800px" }}>
          <label htmlFor="profile" className="hover-event">
            <Image
              src={preview ? preview : userInfo?.userImage}
              styles={{
                width: isDesktop === undefined ? "200px" : "120px",
                height: isDesktop === undefined ? "200px" : "120px",
                border: "6px solid #FF5C00",
              }}
              shape="circle"
            />
          </label>
          <input
            onChange={e => setUserImage(e)}
            id="profile"
            type="file"
            style={{ visibility: "hidden", width: "0" }}
          ></input>
          <Flex styles={{ flexDirection: "column", flex: 1 }}>
            <Text
              styles={{
                fontSize: isDesktop === undefined ? "32px" : "20px",
                fontWeight: "700",
              }}
            >
              <Text
                styles={{
                  fontSize: "inherit",
                  fontWeight: "700",
                  color: "#FF5C00",
                }}
              >
                {userInfo?.userName}
              </Text>
              님 반갑습니다!
            </Text>
            <Text
              styles={{
                fontSize: isDesktop === undefined ? "30px" : "20px",
                fontWeight: "400",
                marginTop: "40px",
                marginBottom: "20px",
              }}
            >
              완료된 거래 수
            </Text>
            <Text styles={{ fontSize: "30px", fontWeight: "700" }}>
              <Text
                styles={{
                  fontSize: "inherit",
                  fontWeight: "700",
                  color: "#FF5C00",
                }}
              >
                {userInfo?.tradeCount ? userInfo.tradeCount : 0}
              </Text>
              건
            </Text>
          </Flex>
        </Flex>
        <Flex
          styles={{
            maxWidth: "960px",
            width: "90%",
            minHeight: "1px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            margin: "40px 0",
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
            나의 공구
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
              <Text styles={{ color: "#fff" }}>제목: {v.title}</Text>
              <Text styles={{ color: "#fff" }}>내용: {v.content}</Text>
              <Text styles={{ color: "#fff" }}>
                마감일: {moment(v.endTime).format("MM-DD")}
              </Text>
              <Text styles={{ color: "#fff" }}>위치: {v.address}</Text>
            </Image>
          ))}
        </Grid>
        <Flex styles={{ minHeight: "10vh" }}></Flex>
      </Flex>
      {modal && (
        <Modal close={() => setModal(false)}>
          <PostModal v={modalRef.current} />
        </Modal>
      )}
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
      _onClick={e => e.stopPropagation()}
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
            {v.headList.length + 1}/{v.headCount}
          </Flex>
        </Flex>
        <Flex styles={{ justifyContent: "start" }}>
          {v.category === "eat" ? (
            <img alt="eat" src={eatCategory} style={iconStyles}></img>
          ) : (
            <img alt="buy" src={buyCategory} style={iconStyles}></img>
          )}
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
