import React, { forwardRef } from "react";

// import "../index.css";

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

let selectedChatCompare;

const ChatBox = React.forwardRef(
  ({ socket, openChatModal, detailInfo, closeChatRoom }, ref) => {
    const dispatch = useDispatch();
    const chatroomUserListRef = React.useRef(null);
    let postid = `p${detailInfo.postId}`;
    // let postid = "p1";

    const selectedChat = useSelector((state) => state.chat);
    const chatAdmin = selectedChat.chatAdmin;
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
      // later replace 1 with "real" selected roomId

      // setChatUsers(chatRoomUsers);
      // if (!postid) {
      // 1은 postid로 대체
      // p+postid 집어 넣기
      if (openChatModal) {
        fetchMessages();
        if (postid !== undefined) {
          socket.emit("startchat", { postid: postid, loggedUser });
        }
      }
    };

    const fetchMessages = () => {
      if (!selectedChat) return;
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
          // chatRoomUserList,
        });

        setNewlyAddedMessages((messageList) => [...messageList, newChat]);
        setNewMessage("");
      }
    };

    React.useEffect(() => {
      goToChat();
      console.log(selectedChatCompare);
      selectedChatCompare = postid;
    }, [postid]);

    React.useEffect(() => {
      socket.on("connected", (enteredUser) => {
        console.log("연결성공!");
        console.log(`${enteredUser}`);
        setSocketConnected(true);
        // 나중에 css 커스터마이징하기
        let newChat = {
          status: "messageAlarm",
          chat: enteredUser,
        };
        setNewlyAddedMessages((messageList) => [...messageList, newChat]);
      });
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    }, []);

    // React.useEffect(() => {
    //   // fetchMessages();
    //   // selectedChatCompare = selectedChat;
    //   // console.log(participantList);
    //   // setAwaiters(awaiterList);
    // }, [awaiterList]);

    //receive message
    React.useEffect(() => {
      socket.on("send alarm", (messageAlarmInfo) => {
        console.log(messageAlarmInfo);
      });
      socket.on("receive message", (newMessageReceived) => {
        console.log(newMessageReceived);
        setNewlyAddedMessages((messageList) => [
          ...messageList,
          newMessageReceived,
        ]);
        // }
        // if (
        //   !selectedChatCompare ||
        //   selectedChatCompare !== newMessageReceived.Post_postId
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

    const OpenChatRoomUserList = () => {
      setOpenUserList(!openUserList);
      console.log(chatroomUserListRef.current);
      if (chatroomUserListRef.current)
        chatroomUserListRef.current.style.width = "0";
    };

    return (
      <>
        <ChatModal
          ref={ref}
          style={{
            position: "fixed",
            transition: "top 500ms cubic-bezier(0.86, 0, 0.07, 1)",
            zIndex: "100",
            width: "432px",
            height: "88vh",
            padding: "20px 23px 20px 23px",
          }}
        >
          <Flex>
            <Text
              styles={{ fontSize: "16px", position: "relative" }}
              _onClick={() => {
                closeChatRoom(loggedUser);
              }}
            >
              X
            </Text>
          </Flex>
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
            />
            {openUserList ? (
              <ChatBoxRight
                postid={postid}
                chatRoomUsers={chatRoomUsers}
                participantList={participantList}
                socket={socket}
                awaiters={awaiters ? awaiters : awaiterList}
                setAwaiters={setAwaiters}
                participants={participants ? participants : participantList}
                setParticipants={setParticipants}
                ref={chatroomUserListRef}
              />
            ) : (
              <></>
            )}
          </Flex>
        </ChatModal>
      </>
    );
  }
);

const ChatModal = styled.div`
  top: 100%;
  backgroundcolor: rgba(231, 232, 244, 0.7);
  boxshadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
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
}) => {
  return (
    <>
      {/* 왼쪽 */}
      <Flex
        styles={{
          width: "100%",
          height: "100%",
          padding: "20px",
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
          borderRadius: "22px",
          position: "absolute",
        }}
      >
        <Flex
          styles={{ justifyContent: "flex-start", margin: "36px 0 22px 0" }}
        >
          <BsChatText
            className="hover-event"
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
            채팅 참여자
          </Text>
        </Flex>
        <Flex
          className="removeScroll"
          styles={{
            flexDirection: "column",
            justifyContent: "stretch",
            overflowX: "hidden",
            overflowY: "auto",
            height: "635px",
            backgroundColor: "#E8E8F2",
            borderRadius: "22px",
            padding: "0px 14px",
          }}
        >
          {/* 메시지가 보이는 곳 */}
          <MessageBox messages={messages} loggedUser={loggedUser} />
        </Flex>
        {isTyping ? <div>loading...</div> : <></>}
        {/* 메시지 보내는 곳 */}
        <Flex
          styles={{
            height: "47px",
            marginTop: "29px",
            borderRadius: "20px",
            backgroundColor: "#E8E8F2",
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
              backgroundColor: "#E8E8F2",
            }}
            onChange={typingHandler}
            onKeyUp={sendNewMessage}
            value={newMessage}
          />
          <FaRegPaperPlane
            className="hover-event"
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
    { postid, socket, awaiters, setAwaiters, participants, setParticipants },
    ref
  ) => {
    const [loadingAddParticipant, setLoadingAddParticipant] =
      React.useState(false);
    const [loadingDeleteParticipant, setLoadingDeleteParticipant] =
      React.useState(false);

    const addNewParticipant = (selectedUser) => {
      setLoadingAddParticipant(true);
      socket.emit("add_new_participant", { postid, selectedUser });

      setParticipants((existingParticipantList) => {
        return existingParticipantList
          ? [...existingParticipantList, selectedUser]
          : [selectedUser];
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
          ? [...existingAwaiterList, selectedUser]
          : [selectedUser];
      });

      setLoadingDeleteParticipant(false);
    };

    return (
      <>
        {/* 오른쪽 */}

        <UserListContainer
          ref={ref}
          // style={{
          //   width: "60%",
          //   height: "100vh",
          //   padding: "20px 5px",
          //   flexDirection: "column",
          //   position: "absolute",
          //   right: "-23px",
          //   top: "-41px",
          //   backgroundColor: "#FFFFFF",
          //   boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
          //   justifyContent: "flex-start",
          //   display: "flex",
          //   justifyContent: "flex-start",
          //   alignItems: "center",
          //   transition: "all 0.2s ease-out",
          // }}
        >
          <div style={{ width: "100%", height: "85%" }}>
            <Flex>
              <Text>{participants.length + 1} / 5</Text>
            </Flex>

            <Flex
              styles={{
                flexDirection: "column",
                padding: "0 22px",
              }}
            >
              <Flex
                styles={{
                  justifyContent: "flex-start",
                  marginBottom: "26px",
                }}
              >
                <Text styles={{ fontWeight: "700", fontSize: "18px" }}>
                  채팅 참여자
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
              <Flex styles={{ justifyContent: "flex-start" }}>
                <Text
                  styles={{
                    fontWeight: "700",
                    fontSize: "18px",
                    margin: "10px 0 26px 0",
                  }}
                >
                  거래자
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
            </Flex>
          </div>
          <Flex
            styles={{
              justifyContent: "flex-end",
              paddingRight: "18px",
            }}
          >
            <GiExitDoor
              className="hover-event"
              style={{ width: "31px", height: "28px" }}
            />
          </Flex>
        </UserListContainer>
      </>
    );
  }
);

const UserListContainer = styled.div`
  width: 60%;
  height: 100vh;
  padding: 20px 5px;
  flex-direction: column;
  position: absolute;
  right: -23px;
  top: -41px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.5s ease-out;
`;

export const Awaiter = ({ awaiter, addNewParticipant }) => {
  return (
    <div style={{ width: "100%" }}>
      <Flex
        styles={{
          borderBottom: "1px solid #000000",
          height: "auto",
          paddingBottom: "12px",
          justifyContent: "space-between",
        }}
      >
        <Flex
          styles={{
            width: "auto",
            marginTop: "10px",
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
      </Flex>
    </div>
  );
};

export const Participants = ({ participant, deleteParticipant }) => {
  return (
    <div style={{ width: "100%" }}>
      <Flex
        styles={{
          borderBottom: "1px solid #000000",
          height: "auto",
          paddingBottom: "12px",
          justifyContent: "space-between",
        }}
      >
        <Flex
          styles={{
            width: "auto",
            marginTop: "10px",
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
      </Flex>
    </div>
  );
};
