import { forwardRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Flex, Text } from "../../elements";
import { menu, send } from "../../image";
import LottieAni from "./LottieAni";
import MessageBox from "./MessageBox";
import Picker from "emoji-picker-react";

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

    // 이모티콘 창 열기/닫기 컨트롤
    const [openEmojiBox, setOpenEmojiBox] = useState(false);

    // 이모티콘 보내기
    const onEmojiClick = (event, emojiObject) => {
      console.log(ref.current.selectionStart);
      let message = [...ref.current.value.trim()];
      let currentCursorPosition = ref.current.selectionStart;
      let emoji = String.fromCodePoint(`0x${emojiObject.unified}`);

      message.splice(currentCursorPosition, 0, emoji);
      ref.current.value = message.join("");

      setOpenEmojiBox(false);
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
          <Flex
            styles={{
              justifyContent: "space-between",
              padding: "0 10px",
              margin: "5px 0 22px 0",
            }}
          >
            <Flex styles={{ width: "85%" }}>
              <img
                alt="menu"
                src={menu}
                style={{
                  marginRight: "8px",
                  width: "22px",
                  height: "24px",
                  zIndex: "22",
                }}
                className="hover-event"
                onClick={OpenChatRoomUserList}
              ></img>
              <Text
                styles={{
                  fontWeight: "700",
                  fontSize: "18px",
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
            <Text
              styles={{ zIndex: "22" }}
              className="hover-event"
              _onClick={() => setOpenEmojiBox(!openEmojiBox)}
            >
              {String.fromCodePoint(0x1f60d)}
            </Text>

            <input
              type="text"
              style={{
                height: "90%",
                width: "80%",
                outline: "none",
                border: "none",
                boxShadow: "none",
                backgroundColor: "#DFD3CA",
                fontSize: "16px",
                padding: "0 5px",
              }}
              maxLength="100"
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
        {openEmojiBox ? (
          <>
            <div
              style={{
                position: "absolute",
                bottom: "45px",
                left: "40px",
                zIndex: "22",
              }}
            >
              <Picker onEmojiClick={onEmojiClick} />
            </div>
            <div
              style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                zIndex: "21",
              }}
              onClick={() => setOpenEmojiBox(false)}
            >
              하핫
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
);

export default ChatBoxLeft;
