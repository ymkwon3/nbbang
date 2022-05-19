import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Button, Flex, Image } from "../elements";
import { actionCreator as postActions } from "../redux/modules/post";
import { actionCreator as userActions } from "../redux/modules/user";
import SearchBox from "./SearchBox";

import { useHistory, useLocation } from "react-router-dom";

import { logo, whiteHeart, notification } from "../image";
import { Desktop, Mobile } from "../shared/Responsive";
import { primaryColor, primaryDarked, secondaryColor } from "../shared/color";

const Header = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isDesktop = Desktop(0);

  const userInfo = useSelector(state => state.user.userInfo);
  const isLogin = useSelector(state => state.user.isLogin);
  const category = useSelector(state => state.post.category);
  const notificationList = useSelector(state => state.notification?.list);

  const [drop, setDrop] = React.useState(false);
  const [dropNoti, setDropNoti] = React.useState(false);

  const clickLogout = () => {
    //temp
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

  const categoryStyle = {
    minWidth: "120px",
    height: "35px",
    borderRadius: "30px",
    // border: `1px solid ${primaryDarked}`,
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
        boxShadow: "0px 9px 10px -4px rgba(0, 0, 0, 0.2)",
        zIndex: 11,
        padding: isDesktop === undefined ? "0 50px" : "0 10px",
      }}
    >
      <Flex styles={{ justifyContent: "start" }}>
        <img
          src={logo}
          alt="logo"
          style={{ width: "40px", height: "40px", cursor: "pointer", marginRight: "40px" }}
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
                  전체
                </Button>
                <Button
                  styles={category === "buy" ? checkedStyle : categoryStyle}
                  _onClick={() => dispatch(postActions.updateCategory("buy"))}
                >
                  같이 사자
                </Button>
                <Button
                  styles={category === "eat" ? checkedStyle : categoryStyle}
                  _onClick={() => dispatch(postActions.updateCategory("eat"))}
                >
                  같이 먹자
                </Button>
              </Desktop>
            </Flex>
          </Flex>
        ) : null}
        {isLogin ? (
          <Flex styles={{ gap: "15px", justifyContent: "end" }}>
            {/* <img src={whiteHeart} alt="filledHeart" /> */}

            {location.pathname === "/" && (
              <>
                <img
                  className="hover-event"
                  src={notification}
                  alt="notification"
                  onClick={() => {
                    setDropNoti(!dropNoti);
                  }}
                />
                {dropNoti && (
                  <Flex
                    styles={{
                      flexDirection: "column",
                      position: "absolute",
                      backgroundColor: "#fff",
                      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                      width: "243px",
                      top: "40px",
                      borderRadius: "10px",
                      padding: "10px",
                      gap: "10px",
                    }}
                  >
                    {notificationList.map((noti, idx) => (
                      <NotiBtn
                        key={noti.alarmId}
                        style={{
                          bg: "#fff",
                          width: "",
                          height: "",
                          border: "none",
                          borderRadius: "4px",
                        }}
                      >
                        {noti.status}
                      </NotiBtn>
                    ))}
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
                  width: "200px",
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
                    if (location.pathname !== `/mypage/${userInfo?.userId}`) {
                      history.push(`/mypage/${userInfo?.userId}`);
                    }

                    setDrop(prev => !prev);
                  }}
                >
                  마이페이지
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
                  로그아웃
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
                로그인
              </Button>
            </Flex>
          )
        )}
      </Flex>
    </Flex>
  );
};

const NotiBtn = styled.button`
  cursor: pointer;
  transition: 0.2s;
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

  &:current {
    background-color: #cdd5ec;
  }
`;
export default Header;
