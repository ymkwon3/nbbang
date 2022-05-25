import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { Flex, Text } from "../../elements";
import { menu, send } from "../../image";
import LottieAni from "./LottieAni";
import MessageBox from "./MessageBox";

const ChatBoxLeft = forwardRef(
  (
    {
      messages,
      typingHandler,
      sendNewMessage,
      loggedUser,
      isTyping,
      OpenChatRoomUserList,
      closeChatRoom,
      title,
      newMessageReceived,
    },
    ref
  ) => {
    const isChatLoading = useSelector((state) => state.chat.isLoading);
    return (
      <>
        {/* 왼쪽 */}
        <Flex
          styles={{
            width: "100%",
            height: "100%",
            padding: "15px",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
            borderRadius: "22px",
            position: "relative",
          }}
        >
          <Flex
            styles={{
              justifyContent: "space-between",
              padding: "0 10px",
              margin: "5px 0 22px 0",
            }}
          >
            <Flex styles={{ width: "auto" }}>
              <img
                alt="menu"
                src={menu}
                style={{ marginRight: "8px", width: "22px", height: "24px" }}
                className="hover-event"
                onClick={OpenChatRoomUserList}
              ></img>

              <Text
                styles={{
                  fontWeight: "700",
                  fontSize: "18px",
                  lineHeight: "22px",
                  color: "#000000",
                }}
              >
                {title}
              </Text>
            </Flex>

            <Flex styles={{ width: "auto" }}>
              <Text
                className="hover-event"
                styles={{
                  fontSize: "32px",
                  position: "relative",
                  color: "rgb(187, 187, 187)",
                }}
                _onClick={() => {
                  closeChatRoom(loggedUser);
                }}
              >
                {"×"}
              </Text>
            </Flex>
          </Flex>

          <Flex
            className="removeScroll"
            styles={{
              flexDirection: "column",
              overflowX: "hidden",
              overflowY: "auto",
              height: "635px",
              backgroundColor: "#DFD3CA",
              borderRadius: "22px",
              padding: "0px 14px",
              justifyContent: "space-between",
            }}
          >
            {/* 메시지가 보이는 곳 */}
            {isChatLoading ? (
              <>
                <Flex styles={{ height: "100%" }}>
                  <LottieAni
                    styles={{ height: "auto", position: "sticky" }}
                    filename="happy-toast.json"
                    speed={1.5}
                  />
                </Flex>
              </>
            ) : (
              <>
                <MessageBox
                  messages={messages}
                  loggedUser={loggedUser}
                  newMessageReceived={newMessageReceived}
                />
              </>
            )}
          </Flex>
          {isTyping ? (
            <LottieAni
              styles={{ height: "40px", position: "sticky", bottom: "5px" }}
              filename="typing.json"
              speed={1}
            />
          ) : (
            <></>
          )}

          {/* 메시지 보내는 곳 */}
          <Flex
            styles={{
              minHeight: "40px",
              marginTop: isTyping ? "0px" : "40px",
              borderRadius: "20px",
              backgroundColor: "#DFD3CA",
              padding: "0 5px",
            }}
          >
            <input
              type="text"
              style={{
                height: "90%",
                width: "85%",
                outline: "none",
                border: "none",
                boxShadow: "none",
                backgroundColor: "#DFD3CA",
                fontSize: "16px",
              }}
              ref={ref}
              onChange={typingHandler}
              onKeyUp={sendNewMessage}
            />
            <img
              alt="send"
              src={send}
              style={{ marginRight: "8px" }}
              onClick={sendNewMessage}
              className="hover-event"
            ></img>
          </Flex>
        </Flex>
      </>
    );
  }
);

export default ChatBoxLeft;