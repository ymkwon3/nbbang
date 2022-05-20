import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreator as postActions } from "../redux/modules/post";

import { Flex, Button, Text, Image } from "../elements";
import ChatBox from "./ChatBox";

import { primaryColor, secondaryColor } from "../shared/color";
import {
  trash,
  eatCategory,
  buyCategory,
  price,
  calendar,
  address,
  content,
} from "../image";

import moment from "moment";
import "moment/locale/ko";
import Modal from "../shared/Modal";
import Confirm from "./Confirm";

// import io from "socket.io-client";
// let socket = io.connect("https://localhost:3443");
// let socket = io.connect("https://redpingpong.shop");

const PostDetail = ({
  openChatroom,
  setOpenChatroom,
  _clickContainer,
  setIsChatButtonClicked,
  socket,
}) => {
  const dispatch = useDispatch();
  const detailInfo = useSelector(state => state.post.postDetail);
  const userInfo = useSelector(state => state.user.userInfo);
  const isLogin = useSelector(state => state.user.isLogin);
  const chatRef = React.useRef();

  const [isDelete, setIsDelete] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);

  const iconStyles = {
    width: "24px",
    height: "24px",
    marginRight: "10px",
  };

  const valueStyles = {
    fontSize: "16px",
    fontWeight: "400",
  };

  const stateShiftForClosingChatroom = () => {
    setOpenChatroom(false);
    setIsChatButtonClicked(false);
  };

  const openChatModal = () => {
    setOpenChatroom(true);
    setIsChatButtonClicked(true);
  };

  const closeChatRoom = userWillLeave => {
    stateShiftForClosingChatroom();
    socket.emit("close chatroom", `p${detailInfo.postId}`, userWillLeave);
  };

  React.useEffect(() => {
    if (openChatroom) {
      chatRef.current.style.top = "0px";
    }
  }, [openChatroom]);

  if (Object.keys(detailInfo).length === 0) {
    return null;
  }
  return (
    <>
      <Flex
        styles={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
          borderRadius: "22px",
          width: "90%",
          height: "90%",
          flexDirection: "column",
          overflow: "scroll",
          justifyContent: "start",
          position: "relative",
        }}
      >
        <Flex styles={{ flexDirection: "column", padding: "25px" }}>
          <Flex styles={{ justifyContent: "end" }}>
            <Text
              styles={{
                fontSize: "32px",
                color: "#bbb",
                lineHeight: "32px",
                cursor: "pointer",
              }}
              _onClick={_clickContainer}
            >
              {"×"}
            </Text>
          </Flex>
          <Flex styles={{ margin: "25px 0" }}>
            <Flex
              styles={{
                width: "fit-content",
                flex: 3,
                justifyContent: "start",
              }}
            >
              <Image
                styles={{
                  width: "50px",
                  height: "50px",
                }}
                src={detailInfo.userImage}
              />
              <Text
                styles={{
                  marginLeft: "10px",
                  fontWeight: "700",
                  fontSize: "20px",
                  fontFamily: "Cafe24Ssurround",
                }}
              >
                {detailInfo.writer}
              </Text>
            </Flex>
            {userInfo?.userId === detailInfo?.User_userId ? (
              <Button _onClick={() => setIsDelete(true)}>
                <img alt="trash" src={trash}></img>
              </Button>
            ) : null}

            <Flex
              styles={{
                width: "60px",
                height: "30px",
                borderRadius: "20px",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              {detailInfo.headList.length + 1}/{detailInfo.headCount}
            </Flex>
          </Flex>
          <Flex styles={{ justifyContent: "start" }}>
            {detailInfo.category === "eat" ? (
              <img alt="eat" src={eatCategory} style={iconStyles}></img>
            ) : (
              <img alt="buy" src={buyCategory} style={iconStyles}></img>
            )}
            <Text
              styles={{
                fontSize: "28px",
                fontWeight: "800",
              }}
            >
              {detailInfo.title}
            </Text>
          </Flex>
        </Flex>
        <Image
          styles={{
            width: "100%",
          }}
          src={detailInfo.image}
          shape={"rectangle"}
        />
        <Flex styles={{ flexDirection: "column", padding: "25px" }}>
          <Flex
            styles={{
              flexDirection: "column",
              gap: "25px",
              alignItems: "flex-start",
            }}
          >
            <Flex styles={{ justifyContent: "space-between" }}>
              <Flex styles={{ flex: 1, justifyContent: "start" }}>
                <img alt="price" src={price} style={iconStyles}></img>
                <Text styles={valueStyles}>
                  {detailInfo.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </Text>
              </Flex>
              <Flex styles={{ flex: 1, justifyContent: "start" }}>
                <img alt="calendar" src={calendar} style={iconStyles}></img>
                <Text styles={valueStyles}>
                  {moment(detailInfo.endTime).format("MM-DD")} 까지
                </Text>
              </Flex>
            </Flex>
            <Flex styles={{ justifyContent: "start" }}>
              <img alt="address" src={address} style={iconStyles}></img>
              <Text styles={valueStyles}>{detailInfo.address}</Text>
            </Flex>
            <Flex styles={{ justifyContent: "start" }}>
              <img alt="content" src={content} style={iconStyles}></img>
              <Text styles={valueStyles}>{detailInfo.content}</Text>
            </Flex>
          </Flex>

          {
            //로그인일 경우에만 보임
            isLogin ? (
              <Button
                styles={{
                  width: "150px",
                  minHeight: "40px",
                  backgroundColor: secondaryColor,
                  color: "#fff",
                  borderRadius: "30px",
                  fontSize: "18px",
                  fontWeight: "700",
                  marginTop: "20px",
                }}
                _onClick={openChatModal}
              >
                채팅 참여
              </Button>
            ) : null
          }

          {
            //본인이 작성한 글만 보임
            userInfo?.userId === detailInfo?.User_userId ? (
              <Button
                styles={{
                  width: "150px",
                  minHeight: "40px",
                  backgroundColor: "#19253D",
                  color: "#fff",
                  borderRadius: "30px",
                  fontSize: "18px",
                  fontWeight: "700",
                  marginTop: "20px",
                }}
                _onClick={() => setIsComplete(true)}
              >
                모집 완료
              </Button>
            ) : null
          }
        </Flex>
      </Flex>
      {openChatroom ? (
        <ChatBox
          ref={chatRef}
          socket={socket}
          openChatroom={openChatroom}
          detailInfo={detailInfo}
          closeChatRoom={closeChatRoom}
          stateShiftForClosingChatroom={stateShiftForClosingChatroom}
        />
      ) : (
        <></>
      )}
      {isDelete ? (
        <Modal close={() => setIsDelete(false)}>
          <Confirm
            _positive={() => {
              // 게시물 삭제
              dispatch(postActions.deletePostDB(detailInfo.postId));
              _clickContainer();
            }}
            _close={() => setIsDelete(false)}
            message="정말로 삭제하시겠습니까?"
          ></Confirm>
        </Modal>
      ) : null}
      {isComplete ? (
        <Modal close={() => setIsComplete(false)}>
          <Confirm
            _positive={() => {
              // 모집 완료
              dispatch(postActions.completePostDB(detailInfo.postId));
              _clickContainer();
            }}
            _close={() => setIsComplete(false)}
            message="모집 완료하시겠습니까?"
          ></Confirm>
        </Modal>
      ) : null}
    </>
  );
};

export default PostDetail;
