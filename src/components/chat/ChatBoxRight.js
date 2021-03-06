import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { Flex, Text } from "../../elements";
import { exit } from "../../image";
import Modal from "../../shared/Modal";
import Awaiters from "./Awaiters";
import Participants from "./Participants";
import Confirm from "../modal/Confirm";
import styled from "styled-components";

const ChatBoxRight = forwardRef(
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
    const [isModal, setIsModal] = React.useState(false);
    // 새로운 거래자를 추가하는 함수
    const addNewParticipant = (selectedUser) => {
      // 새로운 거래자 추가
      socket.emit("add_new_participant", { postid, selectedUser });

      // 기존 거래자 목록 업데이트
      setParticipants((existingParticipantList) => {
        return existingParticipantList
          ? [selectedUser, ...existingParticipantList]
          : [selectedUser, ...participantList];
      });

      // 기존 채팅 참여자 목록 업데이트
      let updatedAwaiterList = awaiters.filter(
        (awaiter) => awaiter.User_userId !== selectedUser.User_userId
      );
      setAwaiters(updatedAwaiterList);
    };
    // 기존 거래자 한명을 목록에서 삭제하는 함수
    const deleteParticipant = (selectedUser) => {
      // 선택된 기존 거래자 삭제
      socket.emit("cancel_new_participant", { postid, selectedUser });

      // 기존 거래자 목록 업데이트
      let updatedParticipantList = participants.filter(
        (participant) => participant.User_userId !== selectedUser.User_userId
      );
      setParticipants(updatedParticipantList);

      // 기존 채팅 참여자 목록 업데이트
      setAwaiters((existingAwaiterList) => {
        return existingAwaiterList
          ? [selectedUser, ...existingAwaiterList]
          : [selectedUser, ...awaiterList];
      });
    };

    // 채팅장에서 퇴장할 때 퇴장 여부를 물어보는 모달창을 띄운다.
    const selfLeavChatroom = () => {
      setIsModal(true);
    };

    return (
      <>
        {/* 오른쪽 */}
        <UserListContainer ref={ref} style={{ width: "0px", zIndex: "22" }}>
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
                    overflowX: "hidden",
                    overflowY: "scroll",
                  }}
                >
                  {awaiters.map((awaiter, idx) => (
                    <Awaiters
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
              minHeight: "30px",
            }}
          >
            <img
              alt="exit"
              src={exit}
              style={{ marginRight: "8px" }}
              onClick={selfLeavChatroom}
              className="hover-event"
            ></img>
          </Flex>
          {isModal && (
            <Modal close={() => setIsModal(false)}>
              <Confirm
                _positive={() => {
                  stateShiftForClosingChatroom();
                  socket.emit("leave chatroom", postid, loggedUser);
                }}
                _close={() => setIsModal(false)}
                message="채팅방에서 나가시겠습니까?"
              ></Confirm>
            </Modal>
          )}
        </UserListContainer>
      </>
    );
  }
);

const UserListContainer = styled.div`
  width: 0px;
  height: 111.1%;
  overflow: hidden;
  flex-direction: column;
  position: absolute;
  right: -23px;
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

export default ChatBoxRight;
