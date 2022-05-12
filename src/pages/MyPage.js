import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Flex, Grid, Image, Text } from "../elements";
import { actionCreator as userPageActions } from "../redux/modules/userpage";
import { actionCreator as userActions } from "../redux/modules/user";

import { notify } from "../components/ToastMessage";

import moment from "moment";
import "moment/locale/ko";

const MyPage = props => {
  const dispatch = useDispatch();
  // 유저페이지 리덕스 모듈에서 불러오는 유저정보, 나의 공구, 참여완료된 공구, 좋아요한 공구
  const userInfo = useSelector(state => state.userpage.userInfo);
  const myList = useSelector(state => state.userpage.myList);
  const joinList = useSelector(state => state.userpage.joinList);
  const likeList = useSelector(state => state.userpage.likeList);
  const userId = useParams().userId;

  const [preview, setPreview] = React.useState(null);

  const imageStyle = {
    borderRadius: "30px",
    border: "1px solid #dbdbdb",
    width: "300px",
    height: "300px",
  };
  const buttonStyle = {
    width: "240px",
    height: "60px",
    marginBottom: "20px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    borderRadius: "30px",
    fontSize: "24px",
    fontWeight: "700",
    color: "rgba(0, 0, 0, 0.5)",
  };

  const checkedStyle = {
    width: "240px",
    height: "60px",
    marginBottom: "20px",
    border: "2px solid #FF5C00",
    borderRadius: "30px",
    fontSize: "24px",
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
      notify("success", "프로필 사진이 변경되었습니다", 2000, "top-right")
      dispatch(userActions.postUserImageDB(formData));
    }
  };

  return (
    <Flex
      styles={{
        flexDirection: "column",
        height: "100%",
        justifyContent: "start",
        paddingTop: "10vh",
      }}
    >
      <Flex styles={{ width: "80%", maxWidth: "800px" }}>
        <label htmlFor="profile" className="hover-event">
          <Image
            src={preview ? preview : userInfo?.userImage}
            styles={{
              width: "200px",
              height: "200px",
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
          <Text styles={{ fontSize: "32px", fontWeight: "700" }}>
            <Text
              styles={{ fontSize: "32px", fontWeight: "700", color: "#FF5C00" }}
            >
              {userInfo?.userName}
            </Text>
            님 반갑습니다!
          </Text>
          <Text
            styles={{
              fontSize: "30px",
              fontWeight: "400",
              marginTop: "40px",
              marginBottom: "20px",
            }}
          >
            완료된 거래 수
          </Text>
          <Text styles={{ fontSize: "30px", fontWeight: "700" }}>
            <Text
              styles={{ fontSize: "30px", fontWeight: "700", color: "#FF5C00" }}
            >
              {userInfo?.tradeCount ? userInfo.tradeCount : 0}
            </Text>
            건
          </Text>
        </Flex>
      </Flex>
      <Flex
        styles={{
          width: "960px",
          height: "1px",
          border: "1px solid rgba(0, 0, 0, 0.5)",
          margin: "40px 0",
        }}
      ></Flex>
      <Grid
        styles={{
          width: "80%",
          maxWidth: "960px",
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
        {/* 이 부분에서 불러온 게시물 맵을 돌려야함 */}
        {postList.map(v => (
          <Image key={v.postId} styles={imageStyle} shape="post" src={v.image}>
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
  );
};

export default MyPage;
