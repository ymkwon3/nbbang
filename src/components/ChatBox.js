import React from "react";

// import "../index.css";

import { Button, Flex, Grid, Image, Input, Text } from "../elements";

import styled from "styled-components";

import { BiPlus } from "react-icons/bi";
import MessageBox from "./MessageBox";

import { chatMockData } from "../redux/chatMockData";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as chatActions } from "../redux/modules/chat";

import moment from "moment";
import "moment/locale/ko";

import io from "socket.io-client";
import { isFulfilled } from "@reduxjs/toolkit";

let socket = io.connect("https://redpingpong.shop"),
  // let socket = io.connect("https://localhost:3443"),
  selectedChatCompare;
let postid = "p1";

const ChatBox = () => {
  const dispatch = useDispatch();

  const selectedChat = useSelector((state) => state.chat);
  const chatAdmin = selectedChat.chatAdmin;
  const chatRoomUsers = selectedChat.userInfo;
  const selectedRoomMessages = selectedChat.chatInfo;
  const participantList = selectedChat.headList;

  const loggedUser = useSelector((state) => state.user.userInfo);

  const [goToChatRoom, setGoToChatRoom] = React.useState(false);
  const [newMessage, setNewMessage] = React.useState("");
  const [newlyAddedMessages, setNewlyAddedMessages] = React.useState([]);
  // const [chatUsers, setChatUsers] = React.useState([]);
  const [notification, setNotification] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useState(false);
  const [typing, setTyping] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [socketConnected, setSocketConnected] = React.useState(false); // socket 연결 상태 체크

  const goToChat = () => {
    setGoToChatRoom(!goToChatRoom);
    // later replace 1 with "real" selected roomId
    fetchMessages();
    // setChatUsers(chatRoomUsers);
    // if (!postid) {
    // 1은 postid로 대체
    // p+postid 집어 넣기
    if (postid !== undefined) {
      socket.emit("startchat", { postid: postid, loggedUser });
    }
    // }
  };

  const fetchMessages = () => {
    if (!selectedChat) return;
    setLoading(true);
    dispatch(chatActions.startChatDB(1));
    setLoading(false);
  };

  const sendNewMessage = async (e) => {
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
        // chatRoomUserList,
      });

      setNewlyAddedMessages((messageList) => [...messageList, newChat]);
      setNewMessage("");
    }
  };

  React.useEffect(() => {
    socket.on("connected", (enteredUser) => {
      console.log("연결성공!");
      console.log(`${enteredUser}`);
      setSocketConnected(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  React.useEffect(() => {
    fetchMessages();
    // selectedChatCompare = selectedChat;
  }, []);

  React.useEffect(() => {
    socket.on(
      "receive message",
      (newMessageReceived) => {
        setNewlyAddedMessages((messageList) => [
          ...messageList,
          newMessageReceived,
        ]);
      }
      // if (
      //   !selectedChatCompare ||
      //   selectedChatCompare.chat.roomId !== selectedChat.chat.roomId
      // ) {
      //   console.log("실행");
      //   // setNotification([newMessageReceived, ...notification]);
      // } else {
      //   console.log(newMessageReceived);
      //   setNewlyAddedMessages((messageList) => [
      //     ...messageList,
      //     newMessageReceived,
      //   ]);
      // }
    );
  }, []);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // Typing Indicator Logic
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      // 나중에 진짜 포스트 번호로 바꾸기
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

  return (
    <>
      <Flex styles={{ flexDirection: "column" }}>
        <Button styles={{ border: "1px solid black" }} _onClick={goToChat}>
          채팅하러가기
        </Button>
        {/* position for laoding */}
        {!goToChatRoom ? (
          <>{/* loading lottie */}</>
        ) : (
          <Flex
            styles={{
              width: "600px",
              height: "600px",
              border: "1px solid black",
            }}
          >
            <ChatBoxLeft
              messages={[...selectedRoomMessages, ...newlyAddedMessages]}
              typingHandler={typingHandler}
              newMessage={newMessage}
              sendNewMessage={sendNewMessage}
              loggedUser={loggedUser}
              isTyping={isTyping}
            />
            <ChatBoxRight
              postid={postid}
              chatRoomUsers={chatRoomUsers}
              participantList={participantList}
              socket={socket}
            />
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default ChatBox;

export const ChatBoxLeft = ({
  messages,
  typingHandler,
  newMessage,
  sendNewMessage,
  loggedUser,
  isTyping,
}) => {
  return (
    <>
      {/* 왼쪽 */}
      <Flex
        styles={{
          border: "1px solid black",
          width: "60%",
          height: "100%",
          padding: "20px",
          flexDirection: "column",
        }}
      >
        <Flex
          className="removeScroll"
          styles={{
            height: "85%",
            border: "1px solid black",
            flexDirection: "column",
            justifyContent: "stretch",
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          {/* 메시지가 보이는 곳 */}
          <MessageBox messages={messages} loggedUser={loggedUser} />
        </Flex>
        {isTyping ? <div>loading...</div> : <></>}
        {/* 메시지 보내는 곳 */}
        <Flex styles={{ height: "7%", marginTop: "8%" }}>
          <input
            type="text"
            style={{ height: "100%", width: "80%" }}
            onChange={typingHandler}
            onKeyUp={sendNewMessage}
            value={newMessage}
          />
          <Button
            styles={{
              border: "1px solid black",
              width: "20%",
              height: "100%",
            }}
            _onClick={sendNewMessage}
          >
            send
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export const ChatBoxRight = ({
  postid,
  chatRoomUsers,
  participantList,
  socket,
}) => {
  const awaiterList = chatRoomUsers.filter((user) => user.isPick === 0);

  const [awaiters, setAwaiters] = React.useState([]);
  const [participants, setParticipants] = React.useState([]);
  const [loadingAddParticipant, setLoadingAddParticipant] =
    React.useState(false);
  const [loadingDeleteParticipant, setLoadingDeleteParticipant] =
    React.useState(false);

  const addNewParticipant = async (selectedUser) => {
    setLoadingAddParticipant(true);
    await socket.emit("add_new_participant", { postid, selectedUser });

    setParticipants((existingParticipantList) => [
      ...existingParticipantList,
      selectedUser,
    ]);
    let updatedAwaiterList = awaiters.filter(
      (awaiter) => awaiter.User_userId !== selectedUser.User_userId
    );
    setAwaiters(updatedAwaiterList);

    setLoadingAddParticipant(false);
  };

  const deleteParticipant = async (selectedUser) => {
    setLoadingDeleteParticipant(true);
    await socket.emit("cancel_new_participant", { postid, selectedUser });

    let updatedParticipantList = participants.filter(
      (participant) => participant.User_userId !== selectedUser.User_userId
    );
    setParticipants(updatedParticipantList);
    setAwaiters((existingAwaiterList) => [
      ...existingAwaiterList,
      selectedUser,
    ]);
    setLoadingDeleteParticipant(false);
  };

  React.useEffect(() => {
    setAwaiters(awaiterList);
    setParticipants(participantList);
  }, []);

  React.useEffect(() => {
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
  }, []);

  return (
    <>
      {/* 오른쪽 */}
      <Flex
        styles={{
          border: "1px solid black",
          width: "40%",
          height: "100%",
          padding: "20px",
          flexDirection: "column",
        }}
      >
        <Flex>
          <Text>{participants.length} / 5</Text>
        </Flex>
        <Flex
          className="removeScroll"
          styles={{
            border: "1px solid black",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            margin: "20px 0",
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
            />
          ))}
        </Flex>
        <Flex
          className="removeScroll"
          styles={{
            border: "1px solid black",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            margin: "20px 0",
            justifyContent: "start",
            flexDirection: "column",
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          {participants.map((participant, idx) => (
            <Participants
              key={participant.User_userId}
              participant={participant}
              deleteParticipant={deleteParticipant}
            />
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export const Awaiter = ({ awaiter, addNewParticipant }) => {
  return (
    <Flex
      styles={{
        border: "1px solid black",
        height: "32px",
        borderRadius: "20px",
        justifyContent: "space-evenly",
        margin: "5px 0",
      }}
    >
      <BiPlus
        onClick={() => {
          addNewParticipant(awaiter);
        }}
      />
      <Text>{awaiter.User_userName}</Text>
      <Flex styles={{ height: "20px", width: "20px" }}>
        <Image
          shape="circle"
          src={awaiter.userImage}
          styles={{ width: "100%", height: "100%" }}
        />
      </Flex>
    </Flex>
  );
};

export const Participants = ({ participant, deleteParticipant }) => {
  return (
    <Flex
      styles={{
        border: "1px solid black",
        height: "32px",
        borderRadius: "20px",
        justifyContent: "space-evenly",
        margin: "5px 0",
      }}
    >
      <BiPlus
        onClick={() => {
          deleteParticipant(participant);
        }}
      />
      <Text>{participant.User_userName}</Text>
      <Flex styles={{ height: "20px", width: "20px" }}>
        <Image
          shape="circle"
          src={participant.userImage}
          styles={{ width: "100%", height: "100%" }}
        />
      </Flex>
    </Flex>
  );
};
