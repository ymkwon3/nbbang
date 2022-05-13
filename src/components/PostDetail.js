import React from "react";
import { useSelector } from "react-redux";

import { Flex, Button, Text, Image } from "../elements";
import ChatBox from "./ChatBox";

import moment from "moment";
import "moment/locale/ko";

import io from "socket.io-client";
// let socket = io.connect("https://localhost:3443");
let socket = io.connect("https://redpingpong.shop");

const PostDetail = ({ openChatroom, setOpenChatroom, _clickContainer }) => {
  const detailInfo = useSelector(state => state.post.postDetail);
  const userInfo = useSelector(state => state.user.userInfo);
  const isLogin = useSelector(state => state.user.isLogin);
  const chatRef = React.useRef();

  const keyStyles = {
    fontSize: "16px",
    fontWeight: "700",
  };

  const valueStyles = {
    fontSize: "16px",
    fontWeight: "400",
  };

  const openChatModal = () => {
    setOpenChatroom(true);
  };

  const closeChatRoom = (userWillLeave) => {
    setOpenChatroom(false);
    socket.emit("close chatroom", `p${detailInfo.postId}`, userWillLeave);
  };

  React.useEffect(() => {
    socket.emit("socket is connected", userInfo);
  }, []);

  React.useEffect(() => {
    if (openChatroom) {
      chatRef.current.style.top = "80px";
    }
  }, [openChatroom]);

  if (Object.keys(detailInfo).length === 0) {
    return null;
  }
  return (
    <>
      <Flex
        styles={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
          borderRadius: "22px",
          width: "90%",
          height: "90%",
          padding: "25px",
          flexDirection: "column",
          overflow: "scroll",
          justifyContent: "start",
        }}
      >
        <Flex styles={{ justifyContent: "end" }}>
          <Text
            styles={{
              fontSize: "32px",
              color: "#bbb",
              lineHeight: "32px",
              cursor: "pointer",
            }}
            _onClick={_clickContainer}
          >
            {"×"}
          </Text>
        </Flex>
        <Flex styles={{ justifyContent: "space-between", margin: "10px 0" }}>
          <Flex styles={{width: "fit-content"}}>
          <Image
            styles={{
              width: "38px",
              height: "38px",
            }}
            src={detailInfo.userImage}
          />
          <Text styles={{marginLeft: "10px", fontWeight: "600"}}>{detailInfo.writer}</Text>
          </Flex>

          <Flex
            styles={{
              width: "60px",
              height: "30px",
              border: "1px solid #19253D",
              borderRadius: "20px",
            }}
          >
            {detailInfo.headList.length}/{detailInfo.headCount}
          </Flex>
        </Flex>
        <Flex styles={{ flexDirection: "column" }}>
          <Flex
            styles={{
              flexDirection: "column",
              gap: "5px",
              padding: "0 10px",
              alignItems: "flex-start",
            }}
          >
            <Text
              styles={{
                fontSize: "28px",
                fontWeight: "800",
              }}
            >
              {detailInfo.title}
            </Text>
            <Flex styles={{ justifyContent: "start", margin: "10px 0" }}>
              <Text styles={keyStyles}>
                카테고리:{" "}
                <Text styles={valueStyles}>{detailInfo.category}</Text>
              </Text>
            </Flex>
            <Flex
              styles={{ justifyContent: "space-between", margin: "10px 0" }}
            >
              <Text styles={keyStyles}>
                가격: <Text styles={valueStyles}>{detailInfo.price}</Text>
              </Text>

              <Text styles={keyStyles}>
                마감일:{" "}
                <Text styles={valueStyles}>
                  {moment(detailInfo.endTime).format("YYYY-MM-DD")}
                </Text>
              </Text>
            </Flex>
            <Flex styles={{ justifyContent: "start", margin: "10px 0" }}>
              <Text styles={keyStyles}>
                장소: <Text styles={valueStyles}>{detailInfo.address}</Text>
              </Text>
            </Flex>
            <Flex styles={{ justifyContent: "start", margin: "10px 0" }}>
              <Text styles={keyStyles}>
                내용: <Text styles={valueStyles}>{detailInfo.content}</Text>
              </Text>
            </Flex>
          </Flex>

          <Image
            styles={{
              width: "100%",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              margin: "10px 0",
            }}
            src={detailInfo.image}
            shape={"rectangle"}
          />
          
          {
            //로그인일 경우에만 보임
          isLogin ? <Button
            styles={{
              width: "150px",
              minHeight: "40px",
              backgroundColor: "#19253D",
              color: "#fff",
              borderRadius: "30px",
              fontSize: "18px",
              fontWeight: "700",
              marginTop: "20px",
            }}
            _onClick={openChatModal}
          >
            채팅 참여
          </Button> : null}
          
          {
            //본인이 작성한 글만 보임
          userInfo?.userId === detailInfo?.User_userId ? <Button
            styles={{
              width: "150px",
              minHeight: "40px",
              backgroundColor: "#19253D",
              color: "#fff",
              borderRadius: "30px",
              fontSize: "18px",
              fontWeight: "700",
              marginTop: "20px",
            }}
            //todo: 임시 비활성화
            _disabled
          >
            거래 완료
          </Button> : null}
        </Flex>
      </Flex>
      {openChatroom ? (
        <ChatBox
          ref={chatRef}
          socket={socket}
          openChatModal={openChatModal}
          detailInfo={detailInfo}
          closeChatRoom={closeChatRoom}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default PostDetail;

{
  /* <Button
                styles={{
                  width: "155px",
                  height: "41px",
                  backgroundColor: "grey",
                  borderRadius: "30px",
                  margin: "0 0 12px 0",
                }}
                _onClick={openChatModal}
              >
                채팅 참여
              </Button>
              <Button
                styles={{
                  width: "155px",
                  height: "41px",
                  backgroundColor: "grey",
                  borderRadius: "30px",
                }}
              >
                거래 완료!
              </Button> */
}
