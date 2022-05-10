import React from "react";
import { isFirstMessage, isLoggedUser } from "../config/ChatLogics";
import { Flex, Image, Text } from "../elements";
import "./messagebubble.css";

import styled from "styled-components";

const MessageBox = ({ messages, loggedUser }) => {
  const messagesEndRef = React.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };
  React.useEffect(scrollToBottom, [messages]);
  return (
    <>
      <Flex styles={{ flexDirection: "column" }}>
        {messages &&
          messages.map((message, idx) => (
            <Flex
              styles={{
                flexDirection: "column",
                marginBottom: "10px",
                alignItems: isLoggedUser(message, loggedUser)
                  ? "flex-end"
                  : "flex-start",
              }}
            >
              <Flex
                styles={{
                  height: "30px",
                  width: "30px",
                  marginRight: "10px",
                  marginBottom: "10px",
                  display: isFirstMessage(message, idx, messages, loggedUser)
                    ? "flex"
                    : "none",
                }}
              >
                <Image
                  shape="circle"
                  src={
                    isFirstMessage(message, idx, messages, loggedUser)
                      ? message.userImage
                      : ""
                  }
                  styles={{ height: "100%" }}
                />
              </Flex>
              {/* <Text>{message.User_userName}</Text> */}
              <Bubble
                className={
                  isLoggedUser(message, loggedUser)
                    ? "bubble-right"
                    : "bubble-left"
                }
                style={{
                  maxWidth: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isLoggedUser(message, loggedUser)
                    ? "flex-end"
                    : "flex-start",
                }}
              >
                <Text>{message.chat}</Text>
              </Bubble>
            </Flex>
          ))}
        <div ref={messagesEndRef} />
      </Flex>
    </>
  );
};

const Bubble = styled.div`
  position: relative;
  font-family: sans-serif;
  font-size: 18px;
  line-height: 24px;
  width: 300px;
  background: #fff;
  border-radius: 40px;
  padding: 13px;
  text-align: center;
  color: #000;
`;
export default MessageBox;
