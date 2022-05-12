import React from "react";
import {
  formatAMPM,
  isFirstMessage,
  isLoggedUser,
  isTheSameDate,
} from "../config/ChatLogics";
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
            <>
              {isTheSameDate(message, idx, messages) ? (
                <Flex
                  styles={{
                    width: "auto",
                    margin: "12px 0",
                    padding: "5px 10px",
                    backgroundColor: "#c3c7cc",
                    borderRadius: "20px",
                  }}
                >
                  <Text styles={{ color: "white" }}>
                    {isTheSameDate(message, idx, messages)}
                  </Text>
                </Flex>
              ) : (
                <></>
              )}

              <Flex
                styles={{
                  flexDirection: "column",
                  margin: "5px 0px",
                }}
              >
                <Flex styles={{ justifyContent: "flex-start" }}>
                  <Flex
                    styles={{
                      height: "30px",
                      width: "30px",
                      marginRight: "10px",
                      marginBottom: "10px",
                      display:
                        isFirstMessage(message, idx, messages, loggedUser) &&
                        !message.status
                          ? "flex"
                          : "none",
                    }}
                  >
                    <Image
                      shape="circle"
                      src={
                        isFirstMessage(message, idx, messages, loggedUser) &&
                        !message.status
                          ? message.userImage
                          : ""
                      }
                      styles={{ height: "100%" }}
                    />
                  </Flex>
                  {isFirstMessage(message, idx, messages, loggedUser) ? (
                    <Text>{message.User_userName}</Text>
                  ) : (
                    <></>
                  )}
                </Flex>
                {isLoggedUser(message, loggedUser) ? (
                  <Flex
                    styles={{
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: "100%",
                        alignItems: "flex-end",
                        marginRight: "5px",
                      }}
                    >
                      <Text>{formatAMPM(message.createdAt)}</Text>
                    </div>
                    <Bubble
                      className="bubble-right"
                      style={{
                        maxWidth: "80%",
                        width: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        backgroundColor: "#FFEF82",
                      }}
                    >
                      <Text>{message.chat}</Text>
                    </Bubble>
                  </Flex>
                ) : (
                  <Flex
                    styles={{
                      justifyContent: "flex-start",
                    }}
                  >
                    {!message.status ? (
                      <>
                        <Bubble
                          className="bubble-left"
                          style={{
                            maxWidth: "80%",
                            width: "auto",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <Text>{message.chat}</Text>
                        </Bubble>
                        <div
                          style={{
                            display: "flex",
                            height: "100%",
                            alignItems: "flex-end",
                            marginLeft: "5px",
                          }}
                        >
                          <Text>{formatAMPM(message.createdAt)}</Text>
                        </div>
                      </>
                    ) : (
                      <>
                        <Flex>
                          <Flex
                            styles={{
                              width: "auto",
                              margin: "5px 0",
                              padding: "5px 10px",
                              backgroundColor: "#c3c7cc",
                              borderRadius: "20px",
                            }}
                          >
                            <Text styles={{ color: "white" }}>
                              {message.chat}
                            </Text>
                          </Flex>
                        </Flex>
                      </>
                    )}
                  </Flex>
                )}
              </Flex>
            </>
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
  padding: 5px 13px;
  text-align: center;
  color: #000;
`;
export default MessageBox;
