import React from "react";
import {
  formatAMPM,
  isFirstMessage,
  isLoggedUser,
  isTheSameDate,
} from "../config/ChatLogics";
import { Flex, Image, Text } from "../elements";

import styled from "styled-components";

import { debounce, throttle } from "lodash";

import { calendarGray } from "../image";

const MessageBox = ({ messages, loggedUser }) => {
  const messagesEndRef = React.useRef(null);
  const scrollToBottom = debounce(() => {
    console.log("실행");
    messagesEndRef.current.scrollIntoView({
      block: "end",
      inline: "nearest",
    });
  }, 5000);

  React.useEffect(() => {
    // scrollToBottom();
  }, [messages]);

  return (
    <>
      <Flex
        styles={{
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {messages &&
          messages.map((message, idx) => (
            <div key={2 + idx} style={{ width: "100%" }}>
              {isTheSameDate(message, idx, messages) ? (
                <Flex
                  styles={{
                    width: "fit-content",
                    margin: "12px auto",
                    padding: "5px 10px",
                    backgroundColor: "rgba(196,173,157, 0.3)",
                    borderRadius: "20px",
                  }}
                >
                  <img
                    style={{ width: "14px", height: "14px" }}
                    src={calendarGray}
                  />
                  <Text
                    styles={{
                      marginLeft: "5px",
                      color: "black",
                      fontSize: "14px",
                      fontFamily: "Pretendard",
                    }}
                  >
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
                    <Text
                      styles={{ fontSize: "14px", fontFamily: "Pretendard" }}
                    >
                      {message.User_userName}
                    </Text>
                  ) : (
                    <></>
                  )}
                </Flex>
                {isLoggedUser(message, loggedUser) ? (
                  <Flex
                    styles={{
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: "100%",
                        marginRight: "2px",
                      }}
                    >
                      <Text
                        styles={{
                          fontSize: "12px",
                          fontFamily: "Pretendard",
                          color: "#716969",
                        }}
                      >
                        {formatAMPM(message.createdAt)}
                      </Text>
                    </div>
                    <Bubble
                      style={{
                        maxWidth: "65%",
                        width: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        backgroundColor: "#FFEF82",
                      }}
                    >
                      <Text
                        styles={{
                          fontSize: "15px",
                          fontFamily: "Pretendard",
                          textAlign: "left",
                        }}
                      >
                        {message.chat}
                      </Text>
                    </Bubble>
                  </Flex>
                ) : (
                  <Flex
                    styles={{
                      justifyContent: "flex-start",
                      alignItems: "flex-end",
                    }}
                  >
                    {!message.status ? (
                      <>
                        <Bubble
                          style={{
                            maxWidth: "65%",
                            width: "auto",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <Text
                            styles={{
                              fontSize: "15px",
                              fontFamily: "Pretendard",
                              textAlign: "left",
                            }}
                          >
                            {message.chat}
                          </Text>
                        </Bubble>
                        <div
                          style={{
                            display: "flex",
                            height: "100%",
                            alignItems: "flex-end",
                            marginLeft: "2px",
                          }}
                        >
                          <Text
                            styles={{
                              fontSize: "12px",
                              fontFamily: "Pretendard",
                              color: "#716969",
                            }}
                          >
                            {formatAMPM(message.createdAt)}
                          </Text>
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
                              backgroundColor: "rgba(196,173,157, 0.3)",
                              borderRadius: "20px",
                            }}
                          >
                            <Text
                              styles={{
                                color: "black",
                                fontSize: "15px",
                                fontFamily: "Pretendard",
                              }}
                            >
                              {message.chat}
                            </Text>
                          </Flex>
                        </Flex>
                      </>
                    )}
                  </Flex>
                )}
              </Flex>
            </div>
          ))}
        <div ref={messagesEndRef}></div>
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
  padding: 6px 13px;
  text-align: center;
  color: #000;
`;
export default MessageBox;
