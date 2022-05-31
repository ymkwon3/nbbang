import { forwardRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Flex, Text } from "../../elements";
import { people, send, question } from "../../image";
import LottieAni from "./LottieAni";
import MessageBox from "./MessageBox";
import SpeechBubble from "./SpeechBubble";

const ChatBoxLeft = forwardRef(
  (
    {
      messages,
      typingHandler,
      sendNewMessage,
      loggedUser,
      isTyping,
      OpenChatRoomUserList,
      title,
      newMessageReceived,
      isDisabled,
      closeChatRoom,
    },
    ref
  ) => {
    const isChatLoading = useSelector((state) => state.chat.isLoading);
    const [showExplainBubble, setShowExplainBubble] = useState(false);
    const bubbleRef = useRef(null);

    const showBubble = () => {
      setShowExplainBubble(!showExplainBubble);
    };
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
          <Flex styles={{ justifyContent: "flex-end" }}>
            <Text
              className="hover-event"
              styles={{
                fontSize: "32px",
                color: "rgb(187, 187, 187)",
                padding: "0 10px",
              }}
              _onClick={() => {
                closeChatRoom(loggedUser);
              }}
            >
              {"×"}
            </Text>
          </Flex>

          <Flex
            styles={{
              justifyContent: "space-between",
              padding: "0 5px",
              margin: "5px 0 17px 0",
            }}
          >
            <Flex
              styles={{
                width: "70%",
                justifyContent: "space-between",
              }}
            >
              <Text
                styles={{
                  fontWeight: "700",
                  fontSize: "25px",
                  lineHeight: "22px",
                  color: "#000000",
                  display: "block",
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {title}
              </Text>
            </Flex>
            <Flex styles={{ justifyContent: "flex-end" }}>
              <img
                alt="question"
                src={question}
                style={{
                  marginRight: "8px",
                  width: "25px",
                  height: "25px",
                  zIndex: "22",
                }}
                className="hover-event"
                onClick={showBubble}
              ></img>
              <img
                alt="people"
                src={people}
                style={{
                  width: "30px",
                  height: "30px",
                  marginBottom: "5px",
                  zIndex: "22",
                }}
                className="hover-event"
                onClick={OpenChatRoomUserList}
              ></img>
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
              maxLength="100"
              ref={ref}
              onChange={typingHandler}
              onKeyUp={sendNewMessage}
              disabled={isDisabled}
            />
            <img
              alt="send"
              src={send}
              style={{ marginRight: "8px" }}
              onClick={isDisabled ? "" : sendNewMessage}
              className={isDisabled ? "make-it-blurr" : "hover-event-to-blurr"}
            ></img>
          </Flex>
        </Flex>
        {showExplainBubble ? (
          <>
            <SpeechBubble ref={bubbleRef} />
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
);

export default ChatBoxLeft;
