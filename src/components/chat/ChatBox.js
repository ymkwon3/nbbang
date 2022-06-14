import React from "react";

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
    const postid = `p${detailInfo.postId}`;

    const selectedChat = useSelector((state) => state.chat);
    const chatRoomUsers = selectedChat.userInfo;
    const selectedRoomMessages = selectedChat.chatInfo;
    const participantList = selectedChat.headList;
    const awaiterList = chatRoomUsers.filter((user) => user.isPick === 0);
    const loggedUser = useSelector((state) => state.user.userInfo);

    // 새로 작성된 메세지
    const newMessageRef = React.useRef("");
    // 새로 수신된 메세지
    const [newMessageReceived, setNewMessageReceived] = React.useState([]);
    // 새로 작성된 메세지 목록
    const [newlyAddedMessages, setNewlyAddedMessages] = React.useState([]);

    // 채팅방 유저 목록창를 open/close에 대한 상태값
    const [isOpenUserList, setIsOpenUserList] = React.useState(false);
    // 채팅 참여자 목록
    const [awaiters, setAwaiters] = React.useState(null);
    // 거래자 목록
    const [participants, setParticipants] = React.useState(null);

    // 해당 채팅방에 있는지에 대한 상태값
    const [socketConnected, setSocketConnected] = React.useState(false);
    // 내가 채팅을 입력하고 있는지에 대한 상태값
    const [typing, setTyping] = React.useState(false);
    // 상대방이 채팅을 입력하고 있는지에 대한 상태값
    const [isTyping, setIsTyping] = React.useState(false);

    // 이전 채팅 메세지 내용 fetch
    const fetchMessages = async () => {
      if (!openChatroom && !postid) return;
      await dispatch(chatActions.startChatDB(detailInfo.postId)).then(() =>
        dispatch(chatactions.isLoading(false))
      );
    };

    // 새로 작성된 메세지를 보내는 함수
    const sendNewMessage = (e) => {
      // 새로 작성된 메세지값이 없으면 함수 종료
      if (!newMessageRef.current.value.trim()) {
        return;
      }
      // 새로 작성된 메세지의 길이를 최대 100자로 제한
      if (
        newMessageRef.current.value.trim().length >
        newMessageRef.current.maxLength
      ) {
        newMessageRef.current.value = newMessageRef.current.value.slice(0, 100);
        return;
      }
      // 엔터를 치거나 보내기 버튼을 클릭하면 메세지를 전송합ㄴ다.
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
        // 상대방이 채팅방에 입장, 나가기, 퇴장을 할 때 채팅 메세지 창에 상대의 상태 안내문을 수신
        // 상대방이 채팅창에 입장 => "~님이 입장하셨습니다."
        // 상대방이 채팅창에 나갈 때 => "~님이 나가셨습니다."
        // 상대방이 채팅창에 퇴장 => "~님이 퇴장하셨습니다."
        setSocketConnected(true);
        let newChat = {
          status: "messageAlarm",
          chat: enteredUser,
        };
        setNewlyAddedMessages((messageList) => [...messageList, newChat]);

        // 유저 유입 혹은 퇴장시 채팅방 유저 목록 업데이트
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

      // 상대방이 채팅 입력중인지 체크
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
      return () => {
        socket.off("connected");
        socket.off("typing");
        socket.off("stop typing");
      };
    }, []);

    React.useEffect(() => {
      // 새 메세지 수신
      socket.on("receive message", (newMessageReceived) => {
        setNewMessageReceived(newMessageReceived);
        setNewlyAddedMessages((messageList) => [
          ...messageList,
          newMessageReceived,
        ]);
      });

      // 새로운 거래자가 등록된 후 거래자 목록 업데이트
      socket.on(
        "receive_participant_list_after_added",
        (updatedParticipantList, updatedAwaiterList) => {
          setParticipants(updatedParticipantList);
          setAwaiters(updatedAwaiterList);
        }
      );

      // 새로운 거래자가 취소된 후 거래자 목록 업데이트
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

    // 상대방이 메세지 입력중인지 알려주는 함수
    const typingHandler = (e) => {
      // Typing Indicator Logic
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
              ref={(e) => (newMessageRef.current = e)}
              sendNewMessage={sendNewMessage}
              loggedUser={loggedUser}
              isTyping={isTyping}
              OpenChatRoomUserList={OpenChatRoomUserList}
              title={detailInfo.title}
              newMessageReceived={newMessageReceived}
              closeChatRoom={closeChatRoom}
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
