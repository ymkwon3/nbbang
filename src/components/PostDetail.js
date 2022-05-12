import React from "react";
import { useSelector } from "react-redux";

import { Flex, Button, Text, Image } from "../elements";
import ChatBox from "./ChatBox";

import moment from "moment";
import "moment/locale/ko";

import io from "socket.io-client";
let socket = io.connect("https://redpingpong.shop");
// let socket = io.connect("https://localhost:3443");

const PostDetail = ({ openChatroom, setOpenChatroom, _clickContainer }) => {
  const detailInfo = useSelector(state => state.post.postDetail);

  const userInfo = useSelector(state => state.user.userInfo);

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
    setOpenChatroom(!openChatroom);
  };
  // React.useEffect(() => {
  //   socket.emit("socket is connected", userInfo);
  // }, []);

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
        <Flex styles={{ justifyContent: "start" }}>
        <Text _onClick={_clickContainer}>{"<"}</Text>
      </Flex>
        <Flex styles={{ justifyContent: "space-between", margin: "10px 0" }}>
          <Image
            styles={{
              width: "38px",
              height: "38px",
            }}
            src={userInfo.userImage}
          />

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
            <Flex styles={{ justifyContent: "space-between", margin: "10px 0" }}>
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
          <Button
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
          </Button>
          <Button
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
          >
            거래 완료
          </Button>
        </Flex>
      </Flex>
      {openChatroom ? (
        <ChatBox
          ref={chatRef}
          socket={socket}
          openChatModal={openChatModal}
          detailInfo={detailInfo}
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
