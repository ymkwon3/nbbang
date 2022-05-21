import React, { forwardRef } from "react";

import { Button, Flex, Grid, Image, Input, Text } from "../elements";

import styled from "styled-components";

import MessageBox from "./MessageBox";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as chatActions } from "../redux/modules/chat";

import { BsChatText } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";

import moment from "moment";
import "moment/locale/ko";
import {
  getDoesTheSamePersonExist,
  getDoesTheSameUserExist,
  getNewAwaiterList,
  getNewlyAddedUser,
  getNewParticipantList,
} from "../config/ChatLogics";

const ChatBox = React.forwardRef(
  (
    {
      socket,
      openChatroom,
      detailInfo,
      closeChatRoom,
      stateShiftForClosingChatroom,
    },
    ref
  ) => {
    const dispatch = useDispatch();
    const chatroomUserListRef = React.useRef(null);
    let postid = `p${detailInfo.postId}`;

    const selectedChat = useSelector((state) => state.chat);
    const chatRoomUsers = selectedChat.userInfo;
    const selectedRoomMessages = selectedChat.chatInfo;
    const participantList = selectedChat.headList;
    const awaiterList = chatRoomUsers.filter((user) => user.isPick === 0);
    const loggedUser = useSelector((state) => state.user.userInfo);

    const [newMessage, setNewMessage] = React.useState("");
    const [newlyAddedMessages, setNewlyAddedMessages] = React.useState([]);
    // const [chatUsers, setChatUsers] = React.useState([]);
    const [notification, setNotification] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    React.useState(false);
    const [typing, setTyping] = React.useState(false);
    const [isTyping, setIsTyping] = React.useState(false);
    const [socketConnected, setSocketConnected] = React.useState(false); // socket 연결 상태 체크
    const [awaiters, setAwaiters] = React.useState(null);
    const [participants, setParticipants] = React.useState(null);
    const [openUserList, setOpenUserList] = React.useState(false);

    const goToChat = () => {
      if (openChatroom) {
        fetchMessages();
        if (postid !== undefined) {
          socket.emit("startchat", { postid: postid, loggedUser });
        }
      }
    };

    const fetchMessages = () => {
      if (!postid) return;
      // setLoading(true);
      // setLoading(false);
      dispatch(chatActions.startChatDB(detailInfo.postId));
      // dispatch(chatActions.startChatDB(1));
    };

    const sendNewMessage = (e) => {
      if (
        !newMessage &&
        ((e.type === "keyup" && e.key === "Enter") || e.type === "click")
      ) {
        //  replace this alert with toast box later in this position.
        window.alert("칸이 비었음!! 채워주삼 ㅇㅇ");
        return;
      }

      if (
        newMessage &&
        ((e.type === "keyup" && e.key === "Enter") || e.type === "click")
      ) {
        let newChat = {
          Post_postId: postid,
          User_userId: loggedUser.userId,
          User_userEmail: loggedUser.userEmail,
          User_userName: loggedUser.userName,
          userImage: loggedUser.userImage,
          chat: newMessage,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        };

        socket.emit("stop typing", postid);
        // let chatRoomUserList = [...chatRoomUsers, chatAdmin];
        socket.emit("sendmessage", {
          postid: postid,
          newMessage: newChat,
        });

        setNewlyAddedMessages((messageList) => [...messageList, newChat]);
        setNewMessage("");
      }
    };

    React.useEffect(() => {
      goToChat();
    }, [postid]);

    React.useEffect(() => {
      socket.on("connected", (enteredUser, updatedChatroomUserList, status) => {
        setSocketConnected(true);
        let newChat = {
          status: "messageAlarm",
          chat: enteredUser,
        };
        setNewlyAddedMessages((messageList) => [...messageList, newChat]);

        // 새로 업데이트된 채팅유저 목록있고, 채팅목록에 새로 추가된 유저가 방장이 아닐 때
        if (updatedChatroomUserList) {
          // 형식 다름에 따른 형식 변환
          let newlyAddedUser = getNewlyAddedUser(updatedChatroomUserList);

          // 참여자 리스트에서 방장 및 겹치는 유저 제거(채팅을 시작거나 채팅방을 나갈 때)
          let newAwaiterList = getNewAwaiterList(
            updatedChatroomUserList,
            newlyAddedUser,
            status
          );

          // 거래자 리스트에서 방장 및 겹치는 유저 제거(채팅을 시작거나 채팅방을 나갈 때)
          let newParticipantList = getNewParticipantList(
            updatedChatroomUserList,
            newlyAddedUser,
            status
          );

          // 스타트챗 버튼을 누른 사람 이 방장일 때
          if (
            newlyAddedUser.User_userId ===
            updatedChatroomUserList[3][0].User_userId
          ) {
            setAwaiters(newAwaiterList);

            // 스타트챗 버튼을 누른 사람 이 방장이 아닐 때
            // 혹은
            // 방장 이외에 어떤 유저가 채팅방을 나갈 때
          } else {
            // 채팅방을 입장하려거나 퇴장하려는 유저가 각각 새로 필터링된 채팅 참여자 리스트와 거래자 리스트에 여전히 존재하는지 체크
            let doesTheSameUserExist = getDoesTheSameUserExist(
              newlyAddedUser,
              newAwaiterList,
              newParticipantList
            );

            if (doesTheSameUserExist) {
              setAwaiters(newAwaiterList);
            } else {
              // 채팅방 나가기 버튼을 눌렀을 때 방장과 새로 나갈 유저를 제거한 참여자 리스트로 업데이트
              if (status === "leave") {
                setAwaiters(newAwaiterList);
              } else {
                // 스타트 챗 버튼을 눌렀을 때 새로운 인원을 추가하여 반환
                setAwaiters([newlyAddedUser, ...newAwaiterList]);
              }
            }
          }
          setParticipants(newParticipantList);
        }
      });

      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    }, []);

    //receive message
    React.useEffect(() => {
      socket.on("receive message", (newMessageReceived) => {
        setNewlyAddedMessages((messageList) => [
          ...messageList,
          newMessageReceived,
        ]);
      });

      socket.on(
        "receive_participant_list_after_added",
        (updatedParticipantList, updatedAwaiterList) => {
          // console.log("추가");
          // console.log("수정된 거래자 리스트: ", updatedParticipantList);
          // console.log("수정된 참여자 리스트: ", updatedAwaiterList);
          setParticipants(updatedParticipantList);
          setAwaiters(updatedAwaiterList);
        }
      );

      socket.on(
        "receive_participant_list_after_canceled",
        (updatedParticipantList, updatedAwaiterList) => {
          // console.log("취소");
          // console.log("수정된 거래자 리스트: ", updatedParticipantList);
          // console.log("수정된 참여자 리스트: ", updatedAwaiterList);
          setParticipants(updatedParticipantList);
          setAwaiters(updatedAwaiterList);
        }
      );
    }, []);

    const typingHandler = (e) => {
      setNewMessage(e.target.value);

      // Typing Indicator Logic
      if (!socketConnected) return;

      if (!typing) {
        setTyping(true);
        socket.emit("typing", postid);
      }

      let lastTypingTime = new Date().getTime();
      let timerLength = 2000;

      setTimeout(() => {
        let timeNow = new Date().getTime();
        let timeDiff = timeNow - lastTypingTime;

        if (timeDiff >= timerLength && typing) {
          socket.emit("stop typing", postid);
          setTyping(false);
        }
      }, timerLength);
    };

    const OpenChatRoomUserList = () => {
      if (chatroomUserListRef.current.style.width === "0px")
        chatroomUserListRef.current.style.width = "70%";
      else chatroomUserListRef.current.style.width = "0px";
    };

    return (
      <>
        <ChatModal
          ref={ref}
          style={{
            position: "absolute",
            transition: "top 500ms cubic-bezier(0.86, 0, 0.07, 1)",
            zIndex: "20",
            maxWidth: "360px",
            width: "100%",
            height: "100%",
            padding: "40px 18px",
            backgroundColor: "rgba(245, 236, 229, 0.2)",
            boxShadow: "20px 8px 11px -8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Flex
            styles={{
              position: "relative",
              height: "100%",
            }}
          >
            <ChatBoxLeft
              messages={[...selectedRoomMessages, ...newlyAddedMessages]}
              typingHandler={typingHandler}
              newMessage={newMessage}
              sendNewMessage={sendNewMessage}
              loggedUser={loggedUser}
              isTyping={isTyping}
              openUserList={openUserList}
              OpenChatRoomUserList={OpenChatRoomUserList}
              closeChatRoom={closeChatRoom}
              title={detailInfo.title}
            />
            <ChatBoxRight
              postid={postid}
              socket={socket}
              awaiters={awaiters ? awaiters : awaiterList}
              awaiterList={awaiterList}
              setAwaiters={setAwaiters}
              participants={participants ? participants : participantList}
              participantList={participantList}
              setParticipants={setParticipants}
              ref={chatroomUserListRef}
              loggedUser={loggedUser}
              stateShiftForClosingChatroom={stateShiftForClosingChatroom}
            />
          </Flex>
        </ChatModal>
      </>
    );
  }
);

const ChatModal = styled.div`
  top: 100%;
  background-color: rgba(231, 232, 244, 0.7);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;
export default ChatBox;

export const ChatBoxLeft = ({
  messages,
  typingHandler,
  newMessage,
  sendNewMessage,
  loggedUser,
  isTyping,
  OpenChatRoomUserList,
  closeChatRoom,
  title,
}) => {
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
            <BsChatText
              className="hover-event-to-blurr"
              style={{ fontSize: "28px", marginRight: "8px" }}
              onClick={OpenChatRoomUserList}
            />
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
            justifyContent: "stretch",
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
          <MessageBox
            isTyping={isTyping}
            messages={messages}
            loggedUser={loggedUser}
          />
          {/* {isTyping ? (
            <Flex
              styles={{
                position: "sticky",
                bottom: "0px",
                height: "auto",
                border: "1px solid black",
              }}
            >
              loading...
            </Flex>
          ) : (
            <></>
          )} */}
          {/* 입시 */}
          <Flex
            styles={{
              position: "sticky",
              bottom: "0px",
              height: "auto",
              border: "1px solid black",
            }}
          >
            loading...
          </Flex>
        </Flex>

        {/* 메시지 보내는 곳 */}
        <Flex
          styles={{
            minHeight: "40px",
            marginTop: "29px",
            borderRadius: "20px",
            backgroundColor: "#DFD3CA",
            padding: "0 5px",
          }}
        >
          <input
            type="text"
            style={{
              height: "100%",
              width: "85%",
              outline: "none",
              border: "none",
              boxShadow: "none",
              backgroundColor: "#DFD3CA",
            }}
            onChange={typingHandler}
            onKeyUp={sendNewMessage}
            value={newMessage}
          />
          <FaRegPaperPlane
            className="hover-event-to-blurr"
            onClick={sendNewMessage}
            style={{ fontSize: "1.2rem", marginLeft: "6px" }}
          />
        </Flex>
      </Flex>
    </>
  );
};

export const ChatBoxRight = forwardRef(
  (
    {
      postid,
      socket,
      awaiters,
      setAwaiters,
      awaiterList,
      participants,
      setParticipants,
      participantList,
      loggedUser,
      stateShiftForClosingChatroom,
    },
    ref
  ) => {
    const selectedChat = useSelector((state) => state.chat);
    const chatAdminId = selectedChat.chatAdmin;

    const [loadingAddParticipant, setLoadingAddParticipant] =
      React.useState(false);
    const [loadingDeleteParticipant, setLoadingDeleteParticipant] =
      React.useState(false);

    const addNewParticipant = (selectedUser) => {
      setLoadingAddParticipant(true);

      socket.emit("add_new_participant", { postid, selectedUser });

      setParticipants((existingParticipantList) => {
        return existingParticipantList
          ? [selectedUser, ...existingParticipantList]
          : [selectedUser, ...participantList];
      });
      let updatedAwaiterList = awaiters.filter(
        (awaiter) => awaiter.User_userId !== selectedUser.User_userId
      );
      setAwaiters(updatedAwaiterList);

      setLoadingAddParticipant(false);
    };

    const deleteParticipant = (selectedUser) => {
      setLoadingDeleteParticipant(true);

      socket.emit("cancel_new_participant", { postid, selectedUser });

      let updatedParticipantList = participants.filter(
        (participant) => participant.User_userId !== selectedUser.User_userId
      );
      setParticipants(updatedParticipantList);
      setAwaiters((existingAwaiterList) => {
        return existingAwaiterList
          ? [selectedUser, ...existingAwaiterList]
          : [selectedUser, ...awaiterList];
      });

      setLoadingDeleteParticipant(false);
    };

    const selfLeavChatroom = () => {
      // put the spinner later
      console.log("실행");
      stateShiftForClosingChatroom();
      socket.emit("leave chatroom", postid, loggedUser);
    };

    return (
      <>
        {/* 오른쪽 */}
        <UserListContainer ref={ref} style={{ width: "0px" }}>
          <div style={{ width: "100%", height: "81%", marginTop: "43px" }}>
            <Flex
              styles={{
                flexDirection: "column",
                padding: "0 22px",
              }}
            >
              <Flex
                styles={{
                  justifyContent: "space-between",
                  marginBottom: "26px",
                }}
              >
                <Text styles={{ fontWeight: "700", fontSize: "18px" }}>
                  채팅 참여자
                </Text>
                <Text styles={{ fontWeight: "700", fontSize: "18px" }}>
                  {awaiters.length} 명
                </Text>
              </Flex>
              <Flex styles={{ overflow: "hidden", height: "26vh" }}>
                <Flex
                  className="removeScroll"
                  styles={{
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                    justifyContent: "start",
                    flexDirection: "column",
                    overflowX: "hidden",
                    overflowY: "scroll",
                  }}
                >
                  {awaiters.map((awaiter, idx) => (
                    <Awaiter
                      key={awaiter.User_userId}
                      awaiter={awaiter}
                      addNewParticipant={addNewParticipant}
                      chatAdminId={chatAdminId}
                      loggedUser={loggedUser}
                    />
                  ))}
                </Flex>
              </Flex>
            </Flex>

            <Flex
              styles={{
                flexDirection: "column",
                padding: "0 22px",
              }}
            >
              <Flex
                styles={{
                  justifyContent: "space-between",
                  margin: "10px 0 26px 0",
                }}
              >
                <Text
                  styles={{
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  거래자
                </Text>
                <Text
                  styles={{
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  {participants.length} 명
                </Text>
              </Flex>
              <Flex
                styles={{
                  overflow: "hidden",
                  height: "26vh",
                }}
              >
                <Flex
                  className="removeScroll"
                  styles={{
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                    justifyContent: "start",
                    overflowX: "hidden",
                    overflowY: "scroll",
                  }}
                >
                  {participants.map((participant, idx) => (
                    <Participants
                      key={participant.User_userId}
                      participant={participant}
                      deleteParticipant={deleteParticipant}
                      chatAdminId={chatAdminId}
                      loggedUser={loggedUser}
                    />
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </div>
          <Flex
            styles={{
              justifyContent: "flex-end",
              paddingRight: "18px",
              marginBottom: "110px",
              display: chatAdminId === loggedUser.userId ? "none" : "flex",
            }}
          >
            <GiExitDoor
              className="hover-event-to-blurr"
              style={{ width: "31px", height: "28px" }}
              onClick={selfLeavChatroom}
            />
          </Flex>
        </UserListContainer>
      </>
    );
  }
);

const UserListContainer = styled.div`
  width: 0px;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  position: absolute;
  right: -23px;
  top: -40px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.12s ease-in-out;

  & > * {
    overflow: hidden;
  }
`;

export const Awaiter = ({
  awaiter,
  addNewParticipant,
  chatAdminId,
  loggedUser,
}) => {
  return (
    <div style={{ width: "100%", marginTop: "10px" }}>
      <Flex
        styles={{
          borderBottom: "2px solid rgba(0, 0, 0, .2)",
          height: "auto",
          paddingBottom: "12px",
          justifyContent: "space-between",
        }}
      >
        <Flex
          styles={{
            width: "auto",
          }}
        >
          <Flex styles={{ height: "34px", width: "34px", marginRight: "15px" }}>
            <Image
              shape="circle"
              src={awaiter.userImage}
              styles={{ width: "100%", height: "100%" }}
            />
          </Flex>
          <Text
            styles={{ fontWieght: "400", fontSize: "16px", lineHeight: "19px" }}
          >
            {awaiter.User_userName}
          </Text>
        </Flex>
        {loggedUser.userId === chatAdminId ? (
          <>
            <Text
              className="hover-event change-color-to-orange"
              styles={{
                fontSize: "30px",
                fontWeight: "700",
                transition: "color 0.3s ease-out",
              }}
              _onClick={() => {
                addNewParticipant(awaiter);
              }}
            >
              +
            </Text>
          </>
        ) : (
          <></>
        )}
      </Flex>
    </div>
  );
};

export const Participants = ({
  participant,
  deleteParticipant,
  chatAdminId,
  loggedUser,
}) => {
  return (
    <div style={{ width: "100%", marginTop: "10px" }}>
      <Flex
        styles={{
          borderBottom: "2px solid rgba(0, 0, 0, .2)",
          height: "auto",
          paddingBottom: "12px",
          justifyContent: "space-between",
        }}
      >
        <Flex
          styles={{
            width: "auto",
          }}
        >
          <Flex styles={{ height: "34px", width: "34px", marginRight: "15px" }}>
            <Image
              shape="circle"
              src={participant.userImage}
              styles={{ width: "100%", height: "100%" }}
            />
          </Flex>
          <Text
            styles={{ fontWieght: "400", fontSize: "16px", lineHeight: "19px" }}
          >
            {participant.User_userName}
          </Text>
        </Flex>
        {loggedUser.userId === chatAdminId ||
        loggedUser.userId === participant.User_userId ? (
          <>
            <div>
              <Text
                className="hover-event"
                styles={{
                  fontSize: "30px",
                  fontWeight: "700",
                  color: "#FF5C00",
                }}
                _onClick={() => {
                  deleteParticipant(participant);
                }}
              >
                <span
                  className="change-color-to-black"
                  style={{ transition: "color 0.3s ease-out" }}
                >
                  +
                </span>
              </Text>
            </div>
          </>
        ) : (
          <></>
        )}
      </Flex>
    </div>
  );
};
