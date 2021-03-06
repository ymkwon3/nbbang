import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Button, Flex, Image, Text } from "../../elements";
import { actionCreator as postActions } from "../../redux/modules/post";
import { actionCreator as userActions } from "../../redux/modules/user";
import moment from "moment";
import SearchBox from "./SearchBox";

import { useHistory, useLocation } from "react-router-dom";

import { logo, notification } from "../../image";
import { Desktop } from "../../shared/Responsive";
import { primaryColor, primaryDarked, secondaryColor } from "../../shared/color";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isDesktop = Desktop(0);

  const userInfo = useSelector(state => state.user.userInfo);
  const isLogin = useSelector(state => state.user.isLogin);
  const category = useSelector(state => state.post.category);
  const notificationList = useSelector(state => state.user?.alarm);

  const [drop, setDrop] = React.useState(false);
  const [dropNoti, setDropNoti] = React.useState(false);

  const clickLogout = () => {
    dispatch(userActions.logout());
    history.push("/login");
    setDrop(prev => !prev);
  };

  const clickLogin = () => {
    history.push("/login");
  };

  const clickLogo = () => {
    history.push("/");
  };

  const readAllAlarm = () => {
    if (dropNoti && notificationList.length > 0) {
      dispatch(userActions.readAllAlarmDB());
    }
    setDropNoti(!dropNoti);
  };

  const categoryStyle = {
    minWidth: "120px",
    height: "35px",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "700",
    fontFamily: "Cafe24SsurroundAir",
  };

  const checkedStyle = {
    color: "#fff",
    backgroundColor: secondaryColor,
    minWidth: "120px",
    height: "35px",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "700",
    fontFamily: "Cafe24SsurroundAir",
  };

  return (
    <Flex
      styles={{
        position: "sticky",
        top: "0",
        minHeight: "50px",
        backgroundColor: primaryColor,
        border: `1px solid ${primaryDarked}`,
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
        zIndex: 11,
        padding: isDesktop === undefined ? "0 50px" : "0 10px",
      }}
    >
      <Flex styles={{ justifyContent: "start" }}>
        <img
          src={logo}
          alt="logo"
          style={{
            width: "40px",
            height: "40px",
            cursor: "pointer",
            marginRight: "40px",
          }}
          onClick={clickLogo}
        ></img>

        {location.pathname === "/" ? (
          <Flex styles={{ justifyContent: "space-between" }}>
            <Flex styles={{ width: "fit-content", gap: "15px" }}>
              <SearchBox></SearchBox>
              <Desktop>
                {" "}
                <Button
                  styles={category === "all" ? checkedStyle : categoryStyle}
                  _onClick={() => dispatch(postActions.updateCategory("all"))}
                >
                  ??????
                </Button>
                <Button
                  styles={category === "buy" ? checkedStyle : categoryStyle}
                  _onClick={() => dispatch(postActions.updateCategory("buy"))}
                >
                  ?????? ??????
                </Button>
                <Button
                  styles={category === "eat" ? checkedStyle : categoryStyle}
                  _onClick={() => dispatch(postActions.updateCategory("eat"))}
                >
                  ?????? ??????
                </Button>
              </Desktop>
            </Flex>
          </Flex>
        ) : null}
        {isLogin ? (
          <Flex styles={{ gap: "15px", justifyContent: "end" }}>
            {location.pathname === "/" && (
              <>
                <div
                  style={{
                    position: "relative",
                    height: "auto",
                    width: "auto",
                  }}
                >
                  <img
                    className="hover-event"
                    src={notification}
                    alt="notification"
                    onClick={readAllAlarm}
                  />
                  <div
                    style={{
                      position: "absolute",
                      right: "0px",
                      top: "0px",
                      fontSize: "13px",
                      backgroundColor: "red",
                      width: "17px",
                      height: "17px",
                      borderRadius: "50%",
                      textAlign: "center",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    {notificationList.length <= 99 &&
                    notificationList.length > 0
                      ? notificationList.length
                      : notificationList.length <= 0
                      ? 0
                      : 99}
                  </div>
                </div>

                {dropNoti && (
                  <Flex
                    styles={{
                      flexDirection: "column",
                      position: "absolute",
                      backgroundColor: "#fff",
                      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                      width: "240px",
                      top: "40px",
                      borderRadius: "10px",
                      padding: "15px 0",
                      gap: "10px",
                    }}
                  >
                    {notificationList.length === 0 ? <Flex>????????? ????????????!</Flex> : notificationList.map((noti, idx) => {
                      return (
                        <NotiBtn key={noti.alarmId}>
                          <img alt="postImage" src={noti.image} style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",
                            marginRight: "10px",
                          }}></img>
                          <Flex styles={{
                            flex: 3,
                            fontSize: "12px",
                            wordBreak: "keep-all"
                          }}>{noti.status}</Flex>
                          <Text styles={{
                            flex: 1,
                            fontSize: "8px",
                            color: "#716969",
                            whiteSpace: "nowrap"
                          }}>{moment(noti.createdAt).fromNow()}</Text>
                        </NotiBtn>
                      );
                    })}
                  </Flex>
                )}
              </>
            )}

            <Image
              styles={{ width: "38px", height: "38px" }}
              src={userInfo.userImage}
              className="hover-event"
              _onClick={() => setDrop(prev => !prev)}
            ></Image>
            {drop ? (
              <Flex
                styles={{
                  flexDirection: "column",
                  position: "absolute",
                  backgroundColor: "#fff",
                  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                  width: "150px",
                  top: "40px",
                  borderRadius: "10px",
                  padding: "10px",
                  gap: "10px",
                }}
              >
                <Button
                  styles={{
                    fontSize: "14px",
                    fontFamily: "Cafe24Ssurround",
                    height: "40px",
                  }}
                  _onClick={() => {
                    history.push(`/mypage/${userInfo?.userId}`);

                    setDrop(prev => !prev);
                  }}
                >
                  ???????????????
                </Button>
                <Button
                  styles={{
                    fontSize: "14px",
                    fontFamily: "Cafe24Ssurround",
                    height: "40px",
                    color: "#FF5C00",
                  }}
                  _onClick={clickLogout}
                >
                  ????????????
                </Button>
              </Flex>
            ) : null}
          </Flex>
        ) : (
          location.pathname === "/" && (
            <Flex styles={{ justifyContent: "end" }}>
              <Button
                styles={{
                  width: "70px",
                  height: "35px",
                  borderRadius: "30px",
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily: "Cafe24SsurroundAir",
                }}
                _onClick={clickLogin}
              >
                ?????????
              </Button>
            </Flex>
          )
        )}
      </Flex>
    </Flex>
  );
};

const NotiBtn = styled.div`
  display: flex;
  
  cursor: pointer;
  transition: 0.2s;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  background-color: #fff;
  width: 90%;
  padding: 5px;

  &:active {
    opacity: 1;
  }

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.3;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    height: 100%;
    background-color: yellow;
  }
`;
export default Header;
