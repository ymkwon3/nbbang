import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreator as postActions } from "../../redux/modules/post";
import { actions as chatActions } from "../../redux/modules/chat";

import { Flex, Button, Text, Image } from "../../elements";
import ChatBox from "../chat/ChatBox";

import { primaryDarked, secondaryColor } from "../../shared/color";
import {
  trash,
  eatCategory,
  buyCategory,
  price,
  calendar,
  address,
  content,
} from "../../image";

import moment from "moment";
import "moment/locale/ko";
import Modal from "../../shared/Modal";
import Confirm from "../modal/Confirm";
import { useHistory } from "react-router-dom";
import { notify } from "../ToastMessage";

const PostDetail = ({
  openChatroom,
  setOpenChatroom,
  _clickContainer,
  setIsChatButtonClicked,
  socket,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
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
    dispatch(chatActions.isLoading(true));
    socket.emit("startchat", {
      postid: `p${detailInfo.postId}`,
      loggedUser: userInfo,
    });
  };

  const closeChatRoom = async userWillCloseChatroom => {
    await socket.emit(
      "closeChatroom",
      `p${detailInfo.postId}`,
      userWillCloseChatroom
    );
    stateShiftForClosingChatroom();
  };

  React.useEffect(() => {
    if (openChatroom && chatRef.current) {
      chatRef.current.style.top = "5%";
    }
  }, [openChatroom]);

  React.useEffect(() => {
    socket.on("block", blockChatroomNoti => {
      // success ??? ?????? ??? ????????? ????????? ??????
      // fail ??? ?????? ??? ????????? ????????? ??????
      if (blockChatroomNoti === "success") {
        setOpenChatroom(true);
        setIsChatButtonClicked(true);
      } else {
        notify("error", "??????????????? ??? ??? ???????????????.", 2000);
      }
    });
    return () => {
      socket.off("block");
    };
  }, []);

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
          <Flex styles={{ justifyContent: "space-between" }}>
            <Flex
              styles={{
                width: "fit-content",
                flex: 3,
                justifyContent: "start",
              }}
            >
              <Image
                styles={{
                  width: "40px",
                  height: "40px",
                }}
                src={detailInfo.userImage}
                _onClick={() => {
                  if (isLogin)
                    history.push(`/mypage/${detailInfo.User_userId}`);
                }}
                className="hover-event"
              />
              <Text
                styles={{
                  marginLeft: "10px",
                  fontWeight: "700",
                  fontSize: "18px",
                  fontFamily: "Cafe24SsurroundAir",
                }}
                _onClick={() => {
                  if (isLogin)
                    history.push(`/mypage/${detailInfo.User_userId}`);
                }}
                className="hover-event"
              >
                {detailInfo.writer}
              </Text>
            </Flex>
            <Flex
              styles={{
                width: "min-content",
                fontSize: "32px",
                color: "#bbb",
                cursor: "pointer",
                height: "40px",
                alignItems: "start",
              }}
              _onClick={_clickContainer}
            >
              {"??"}
            </Flex>
          </Flex>
          <Flex styles={{ margin: "20px 0" }}>
            <Flex
              styles={{
                justifyContent: "start",
              }}
            >
              {detailInfo.category === "eat" ? (
              <img alt="eat" src={eatCategory} style={iconStyles}></img>
            ) : (
              <img alt="buy" src={buyCategory} style={iconStyles}></img>
            )}
              <Text styles={{color: secondaryColor}}>{detailInfo.type}</Text>
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
            
            <Text
              styles={{
                fontSize: "28px",
                fontWeight: "800",
                fontFamily: "Cafe24SsurroundAir",
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
                  ???
                </Text>
              </Flex>
              <Flex styles={{ flex: 1, justifyContent: "start" }}>
                <img alt="calendar" src={calendar} style={iconStyles}></img>
                <Text styles={valueStyles}>
                  {moment(detailInfo.endTime).format("MM-DD")} ??????
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
            //???????????? ???????????? ??????
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
                  marginTop: "40px",
                }}
                _onClick={openChatModal}
              >
                ?????? ??????
              </Button>
            ) : null
          }

          {
            //????????? ????????? ?????? ??????
            userInfo?.userId === detailInfo?.User_userId ? (
              <Button
                styles={{
                  width: "150px",
                  minHeight: "40px",
                  backgroundColor: primaryDarked,
                  color: "#fff",
                  borderRadius: "30px",
                  fontSize: "18px",
                  fontWeight: "700",
                  marginTop: "10px",
                }}
                _onClick={() => setIsComplete(true)}
              >
                ?????? ??????
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
              // ????????? ??????
              dispatch(postActions.deletePostDB(detailInfo.postId));
              _clickContainer();
            }}
            _close={() => setIsDelete(false)}
            message="????????? ?????????????????????????"
          ></Confirm>
        </Modal>
      ) : null}
      {isComplete ? (
        <Modal close={() => setIsComplete(false)}>
          <Confirm
            _positive={() => {
              // ?????? ??????
              dispatch(postActions.completePostDB(detailInfo.postId));
              _clickContainer();
            }}
            _close={() => setIsComplete(false)}
            message="????????? ?????????????????????????"
          ></Confirm>
        </Modal>
      ) : null}
    </>
  );
};

export default PostDetail;
