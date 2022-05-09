import React from "react";
import { isFirstMessage, isLoggedUser } from "../config/ChatLogics";
import { Flex, Image, Text } from "../elements";

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
                justifyContent: isLoggedUser(message, loggedUser)
                  ? "flex-end"
                  : "flex-start",
              }}
            >
              <Flex
                styles={{ height: "30px", width: "30px", marginRight: "10px" }}
              >
                <Image
                  shape="circle"
                  src={
                    message.User_userEmail !== loggedUser.userEmail &&
                    isFirstMessage(message, idx, messages)
                      ? message.userImage
                      : ""
                  }
                  styles={{ height: "100%" }}
                />
              </Flex>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Text>{message.User_userName}</Text>
                <Text>{message.chat}</Text>
              </div>
            </Flex>
          ))}
        <div ref={messagesEndRef} />
      </Flex>
    </>
  );
};

export default MessageBox;
