import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Flex, Button, Text, Image } from "../elements";
import ChatBox from "./ChatBox";

import io from "socket.io-client";
// let socket = io.connect("https://localhost:3443");
let socket = io.connect("https://redpingpong.shop");

const PostDetail = ({ openChatroom, setOpenChatroom }) => {
  const detailInfo = useSelector((state) => state.post.postDetail);
  // console.log(detailInfo);
  const userInfo = useSelector((state) => state.user.userInfo);

  const chatRef = React.useRef();
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

  return (
    <>
      <Flex
        styles={{
          width: "432px",
          height: "100%",
          zIndex: "20",
          backgroundColor: "rgba( 220, 220, 220, 0.6 )",
        }}
      >
        <Flex
          styles={{
            width: "387px",
            height: "93%",
            zIndex: "30",
            backgroundColor: "white",
            flexDirection: "column",
          }}
        >
          <Flex styles={{ margin: "0 0 14px 0" }}>
            <Flex>
              <Image
                styles={{
                  with: "38px",
                  height: "38px",
                  margin: "0  120px 0 30px",
                }}
                src={userInfo.userImage}
              />
            </Flex>
            <Flex>
              <Text
                styles={{
                  width: "54px",
                  height: "28px",
                  margin: "0 0 0 80px",
                  padding: "5px",
                  // backgroundColor:"black"
                  border: "1px solid",
                  borderRadius: "30px",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                1/{detailInfo.headCount}
              </Text>
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
                  alignItems: "start",
                }}
              >
                {detailInfo.title}
              </Text>
              <Text>{detailInfo.category}</Text>
              <Flex styles={{ justifyContent: "space-between" }}>
                <Text>가격 : {detailInfo.price}</Text>
                <Text styles={{ margin: "0 160px 0 0" }}>
                  기한 : {detailInfo.endTime}
                </Text>
              </Flex>
              <Text>내용 : {detailInfo.content}</Text>
            </Flex>
            <Image
              styles={{
                width: "332px",
                height: "225px",
                borderRadius: "27px",
                margin: "20px 0 20px",
              }}
              src={detailInfo.image}
              shape={"rectangle"}
            />
            <Button
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
            </Button>
          </Flex>
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
