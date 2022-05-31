import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Flex, Grid, Image, Text } from "../elements";
import { actionCreator as userPageActions } from "../redux/modules/userpage";

import { Desktop } from "../shared/Responsive";

import Modal from "../shared/Modal";

import UserInfo from "../components/mypage/UserInfo";
import UserUpdate from "../components/mypage/UserUpdate";
import PersonalReviews from "../components/modal/PersonalReviews";
import PostModal from "../components/modal/PostModal";
import PostReview from "../components/modal/PostReview";

const MyPage = (props) => {
  const dispatch = useDispatch();
  // 유저페이지 리덕스 모듈에서 불러오는 유저정보, 나의 공구, 참여완료된 공구, 좋아요한 공구
  const userInfo = useSelector((state) => state.userpage.userInfo);
  const myList = useSelector((state) => state.userpage.myList);
  const joinList = useSelector((state) => state.userpage.joinList);
  const likeList = useSelector((state) => state.userpage.likeList);

  const loginUserId = useSelector((state) => state.user.userInfo.userId);
  const userId = parseInt(useParams().userId);
  const [isUpdate, setIsUpdate] = React.useState(false);

  const isDesktop = Desktop(0);

  // 모달상태관리
  const [modal, setModal] = React.useState(false);
  const [reviewModal, setReviewModal] = React.useState(false);
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

  const showReviews = () => {
    dispatch(userPageActions.getReviewListDB(userId)).then((res) =>
      setReviewModal(true)
    );
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
              showReviews={showReviews}
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
            {postList.map((v) => (
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
                {v.isDone === 1 ? (
                  v.needReview ? (
                    <Flex styles={{ flexDirection: "column" }}>
                      <Text>완료공구</Text>
                      <Text>*후기작성가능</Text>
                    </Flex>
                  ) : (
                    "완료 공구"
                  )
                ) : v.isDone === 2 ? (
                  "미완료 공구"
                ) : null}
              </Image>
            ))}
          </Grid>
        )}
        <Flex styles={{ minHeight: "10vh" }}></Flex>
      </Flex>
      {modal && modalRef.current.needReview ? (
        <Modal close={() => setModal(false)}>
          <PostReview
            v={modalRef.current}
            close={() => setModal(false)}
          ></PostReview>
        </Modal>
      ) : (
        modal && (
          <Modal close={() => setModal(false)}>
            <PostModal v={modalRef.current} />
          </Modal>
        )
      )}
      {reviewModal ? (
        <>
          <Modal close={() => setReviewModal(false)}>
            <PersonalReviews userName={userInfo.userName} />
          </Modal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyPage;
