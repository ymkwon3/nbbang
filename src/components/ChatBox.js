import React from "react";

import { Button, Flex, Grid, Image, Input, Text } from "../elements";

import styled from "styled-components";

import { BiPlus } from "react-icons/bi";
import MessageBox from "./MessageBox";

const ChatBox = () => {
  const [goToChatRoom, setGoToChatRoom] = React.useState(false);
  return (
    <>
      <Button
        styles={{ border: "1px solid black" }}
        _onClick={setGoToChatRoom(true)}
      >
        채팅하러가기
      </Button>
      {goToChatRoom ? (
        <Flex
          styles={{
            width: "600px",
            height: "600px",
            border: "1px solid black",
          }}
        >
          <ChatBoxLeft />
          <ChatBoxRight />
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChatBox;

export const ChatBoxLeft = () => {
  return (
    <>
      {/* 왼쪽 */}
      <Flex
        styles={{
          border: "1px solid black",
          width: "60%",
          height: "100%",
          padding: "20px",
          flexDirection: "column",
        }}
      >
        <Flex
          styles={{
            height: "85%",
            border: "1px solid black",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {/* 메시지가 보이는 곳 */}
          <MessageBox />
        </Flex>
        {/* 메시지 보내는 곳 */}
        <Flex styles={{ height: "7%", marginTop: "8%" }}>
          <input type="text" style={{ height: "100%", width: "80%" }}></input>
          <Button
            styles={{
              border: "1px solid black",
              width: "20%",
              height: "100%",
            }}
          >
            send
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export const ChatBoxRight = () => {
  return (
    <>
      {/* 오른쪽 */}
      <Flex
        className="removeScroll"
        styles={{
          border: "1px solid black",
          width: "40%",
          height: "100%",
          padding: "20px",
          flexDirection: "column",
          overflowX: "hidden",
          overflowY: "scroll",
        }}
      >
        <Flex>
          <Text>1/5</Text>
        </Flex>
        <Flex
          styles={{
            border: "1px solid black",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            margin: "20px 0",
            justifyContent: "start",
          }}
        >
          <Awaiter />
          <Awaiter />
          <Awaiter />
          <Awaiter />
        </Flex>
      </Flex>
    </>
  );
};

export const Awaiter = () => {
  return (
    <Flex
      styles={{
        border: "1px solid black",
        height: "32px",
        borderRadius: "20px",
        justifyContent: "space-evenly",
        margin: "5px 0",
      }}
    >
      <BiPlus />
      <Text>원경...</Text>
      <Flex styles={{ height: "20px", width: "20px" }}>
        <Image shape="circle" styles={{ width: "100%", height: "100%" }} />
      </Flex>
    </Flex>
  );
};
