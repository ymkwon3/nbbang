import React, { useEffect } from "react";

import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  actionCreator as chatActions,
  actions as chatactions,
} from "../../redux/modules/chat";

import moment from "moment";
import {
  getDoesTheSameUserExist,
  getNewAwaiterList,
  getNewlyAddedUser,
  getNewParticipantList,
} from "../../config/ChatLogics";

import ChatBoxLeft from "./ChatBoxLeft";
import ChatBoxRight from "./ChatBoxRight";
import { Flex } from "../../elements";
import { notify } from "../ToastMessage";

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

    const newMessageRef = React.useRef("");
    const [isOpenUserList, setIsOpenUserList] = React.useState(false);
    const [newMessageReceived, setNewMessageReceived] = React.useState([]);
    const [newlyAddedMessages, setNewlyAddedMessages] = React.useState([]);
    const [typing, setTyping] = React.useState(false);
    const [isTyping, setIsTyping] = React.useState(false);
    const [socketConnected, setSocketConnected] = React.useState(false); // socket 연결 상태 체크
    const [awaiters, setAwaiters] = React.useState(null);
    const [participants, setParticipants] = React.useState(null);

    const fetchMessages = async () => {
      if (!openChatroom && !postid) return;
      await dispatch(chatActions.startChatDB(detailInfo.postId)).then(() =>
        dispatch(chatactions.isLoading(false))
      );
    };

    const sendNewMessage = (e) => {
      // 입력값이 없으면
      if (!newMessageRef.current.value.trim()) {
        return;
      }
      if (
        newMessageRef.current.value.trim().length >
        newMessageRef.current.maxLength
      ) {
        newMessageRef.current.value = newMessageRef.current.value.slice(0, 100);
        return;
      }
      if (
        newMessageRef.current.value &&
        ((e.type === "keyup" && e.key === "Enter") || e.type === "click")
      ) {
        let newChat = {
          Post_postId: postid,
          User_userId: loggedUser.userId,
          User_userEmail: loggedUser.userEmail,
          User_userName: loggedUser.userName,
          userImage: loggedUser.userImage,
          chat: newMessageRef.current.value.trim(),
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        };

        socket.emit("stop typing", postid);
        socket.emit("sendmessage", {
          postid: postid,
          newMessage: newChat,
        });

        setNewlyAddedMessages((messageList) => [...messageList, newChat]);
        newMessageRef.current.value = "";
        setNewMessageReceived(newChat);
      }
    };

    React.useEffect(() => {
      fetchMessages();
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
      return () => {
        socket.off("connected");
        socket.off("typing");
        socket.off("stop typing");
      };
    }, []);

    //receive message
    React.useEffect(() => {
      socket.on("receive message", (newMessageReceived) => {
        setNewMessageReceived(newMessageReceived);
        setNewlyAddedMessages((messageList) => [
          ...messageList,
          newMessageReceived,
        ]);
      });

      socket.on(
        "receive_participant_list_after_added",
        (updatedParticipantList, updatedAwaiterList) => {
          setParticipants(updatedParticipantList);
          setAwaiters(updatedAwaiterList);
        }
      );

      socket.on(
        "receive_participant_list_after_canceled",
        (updatedParticipantList, updatedAwaiterList) => {
          setParticipants(updatedParticipantList);
          setAwaiters(updatedAwaiterList);
        }
      );

      return () => {
        socket.off("receive message");
        socket.off("receive_participant_list_after_added");
        socket.off("receive_participant_list_after_canceled");
      };
    }, []);

    const typingHandler = (e) => {
      if (!socketConnected) return;

      // todo: 나중에 쓰로틀이 나을듯
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
      if (chatroomUserListRef.current.style.width === "0px") {
        chatroomUserListRef.current.style.width = "70%";
        setIsOpenUserList(true);
      } else {
        chatroomUserListRef.current.style.width = "0px";
        setIsOpenUserList(false);
      }
    };

    return (
      <>
        <ChatModal
          ref={ref}
          style={{
            position: "absolute",
            zIndex: "20",
            width: "90%",
            height: "90%",
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
              // ref={(e) => (newMessageRef.current = e)}
              ref={newMessageRef}
              sendNewMessage={sendNewMessage}
              loggedUser={loggedUser}
              isTyping={isTyping}
              OpenChatRoomUserList={OpenChatRoomUserList}
              closeChatRoom={closeChatRoom}
              title={detailInfo.title}
              newMessageReceived={newMessageReceived}
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
          {isOpenUserList ? (
            <>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  zIndex: "21",
                  position: "fixed",
                  top: "0",
                  left: "0",
                }}
                onClick={OpenChatRoomUserList}
              ></div>
            </>
          ) : (
            <></>
          )}
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
