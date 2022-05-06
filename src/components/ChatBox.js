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

let socket, selectedChatCompare;

const ChatBox = () => {
  const dispatch = useDispatch();

  const selectedChat = useSelector((state) => state.chat);
  // console.log(selectedChat);
  const chatAdmin = selectedChat.room.chatAdmin;
  // console.log(chatAdmin);
  const chatRoomUsers = selectedChat.room.users;
  // console.log(selectedChatUsers);
  const selectedChatmessages = selectedChat.messages;
  // console.log(selectedChatmessages);

  const loggedUser = useSelector((state) => state.user.userInfo);
  // console.log(loggedUser);

  const [goToChatRoom, setGoToChatRoom] = React.useState(false);
  const [newMessage, setNewmessage] = React.useState({
    roomId: "",
    sender: {},
    content: "",
    createdAt: "",
  });
  const [newlyAddedMessages, setNewlyAddedMessages] = React.useState([]);
  const [chatUsers, setChatUsers] = React.useState([]);
  const [notification, setNotification] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useState(false);
  const [typing, setTyping] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [socketConnected, setSocketConnected] = React.useState(false); // socket 연결 상태 체크

  const goToChat = () => {
    setGoToChatRoom(!goToChatRoom);

    // later replace 1 with "real" selected roomId
    // fetchMessages();
    setChatUsers(chatRoomUsers);
    if (selectedChat.room.roomId !== "") {
      socket.emit("join chat", selectedChat.room.roomId);
    }
  };

  const fetchMessages = () => {
    if (!selectedChat) return;
    setLoading(true);
    // dispatch(chatActions.startChatDB(1));
    setLoading(false);
  };

  const sendNewMessage = async (e) => {
    if (
      ((e.type === "keyup" && e.key === "Enter") || e.type === "click") &&
      !newMessage.content
    ) {
      //  replace this alert with toast box later in this position.
      window.alert("칸이 비었음!! 채워주삼 ㅇㅇ");
      return;
    }

    if (
      ((e.type === "keyup" && e.key === "Enter") || e.type === "click") &&
      newMessage.content
    ) {
      socket.emit("stop typing", selectedChat.room.roomId);
      let chatRoomUserList = [...chatRoomUsers, chatAdmin];
      await socket.emit("send_message", newMessage, chatRoomUserList);
      setNewlyAddedMessages((messageList) => [...messageList, newMessage]);
      setNewmessage({ ...newMessage, content: "" });
    }
  };

  React.useEffect(() => {
    socket = io.connect("http://localhost:5000");
    socket.emit("setup", loggedUser);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  React.useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  React.useEffect(() => {
    socket.on("receive_message", (newMessageReceived) => {
      console.log("라면 먹자");
      console.log(selectedChatCompare);
      if (
        !selectedChatCompare ||
        selectedChatCompare.chat.roomId !== selectedChat.chat.roomId
      ) {
        console.log("실행");
        // setNotification([newMessageReceived, ...notification]);
      } else {
        console.log(newMessageReceived);
        setNewlyAddedMessages((messageList) => [
          ...messageList,
          newMessageReceived,
        ]);
      }
    });
  }, []);

  const typingHandler = (e) => {
    setNewmessage({
      ...newMessage,
      roomId: selectedChatmessages[0].roomId,
      sender: { ...loggedUser },
      content: e.target.value,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    // Typing Indicator Logic
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat.room.roomId);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 2000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat.room.roomId);
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
              messages={[...selectedChatmessages, ...newlyAddedMessages]}
              typingHandler={typingHandler}
              newMessage={newMessage}
              sendNewMessage={sendNewMessage}
              loggedUser={loggedUser}
              isTyping={isTyping}
            />
            <ChatBoxRight chatUsers={chatUsers} socket={socket} />
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
  messageSendingLoading,
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
            value={newMessage.content}
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

export const ChatBoxRight = ({ chatUsers, socket }) => {
  const dispatch = useDispatch();
  const [selectedOnes, setSelectedOnes] = React.useState([]);
  const [awaiters, setAwaiters] = React.useState([]);
  const [loadingAddParticipant, setLoadingAddParticipant] =
    React.useState(false);
  const [loadingDeleteParticipant, setLoadingDeleteParticipant] =
    React.useState(false);

  const addNewParticipant = async (selectedUser) => {
    setLoadingAddParticipant(true);
    setSelectedOnes((selectedUserList) => [...selectedUserList, selectedUser]);
    const newAwaiterList = awaiters.filter(
      (awaiter) => awaiter !== selectedUser
    );
    setAwaiters([...newAwaiterList]);

    await socket.emit("add_new_participant", selectedUser);
  };

  const deleteParticipant = async (selectedUser) => {
    setLoadingDeleteParticipant(true);
    const newParticipantList = selectedOnes.filter(
      (participant) => participant !== selectedUser
    );
    console.log(newParticipantList);
    setSelectedOnes([...newParticipantList]);
    await socket.emit("delete_a_participant", selectedUser);
  };

  React.useEffect(() => {
    setAwaiters([...chatUsers]);
  }, []);

  React.useEffect(async () => {
    await socket.on(
      "receive_newly_added_participant",
      (newlyAddedParticipant) => {
        setSelectedOnes((selectedUserList) => [
          ...selectedUserList,
          newlyAddedParticipant,
        ]);
        const newAwaiterList = awaiters.filter(
          (awaiter) => awaiter !== newlyAddedParticipant
        );
        setAwaiters([...newAwaiterList]);
        setLoadingAddParticipant(false);
      }
    );
  }, []);

  React.useEffect(async () => {
    await socket.on(
      "receive_deleted_participant",
      (newlyDeletedParticipant) => {
        console.log(newlyDeletedParticipant);
        console.log(selectedOnes);
        setLoadingDeleteParticipant(false);
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
          <Text>{selectedOnes.length} / 5</Text>
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
          {awaiters.map((user, idx) => (
            <Awaiter
              key={user.userId}
              user={user}
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
          {selectedOnes.map((selecteduser, idx) => (
            <Participents
              key={selecteduser.id}
              selecteduser={selecteduser}
              deleteParticipant={deleteParticipant}
            />
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export const Awaiter = ({ user, addNewParticipant }) => {
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
          addNewParticipant(user);
        }}
      />
      <Text>{user.userName}</Text>
      <Flex styles={{ height: "20px", width: "20px" }}>
        <Image
          shape="circle"
          src={user.userImage}
          styles={{ width: "100%", height: "100%" }}
        />
      </Flex>
    </Flex>
  );
};

export const Participents = ({ selecteduser, deleteParticipant }) => {
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
          deleteParticipant(selecteduser);
        }}
      />
      <Text>{selecteduser.userName}</Text>
      <Flex styles={{ height: "20px", width: "20px" }}>
        <Image
          shape="circle"
          src={selecteduser.userImage}
          styles={{ width: "100%", height: "100%" }}
        />
      </Flex>
    </Flex>
  );
};
