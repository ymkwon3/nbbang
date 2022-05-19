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

const Header = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const userInfo = useSelector(state => state.user.userInfo);
  const isLogin = useSelector(state => state.user.isLogin);
  const category = useSelector(state => state.post.category);

  const [drop, setDrop] = React.useState(false);

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
    width: "120px",
    height: "35px",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "500",
  };

  const checkedStyle = {
    color: "#fff",
    backgroundColor: "#FF5C00",
    width: "120px",
    height: "35px",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "500",
  };

  return (
    <Flex
      styles={{
        position: "sticky",
        top: "0",
        minHeight: "50px",
        backgroundColor: "#19253D",
        boxShadow: "0 8px 10px -4px rgba(0, 0, 0, 0.2)",
        zIndex: 11,
        padding: "0 50px",
      }}
    >
      <Flex styles={{ justifyContent: "start" }}>
        <img
          src={logo}
          alt="logo"
          style={{ width: "40px", height: "40px", cursor: "pointer" }}
          onClick={clickLogo}
        ></img>
        <Desktop>
          {location.pathname === "/" ? (
            <Flex styles={{ justifyContent: "space-between" }}>
              <Flex styles={{ width: "fit-content", gap: "15px" }}>
                <SearchBox/>
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
              </Flex>

              {isLogin ? (
                <Flex styles={{ gap: "15px", width: "fit-content" }}>
                  {/* <img src={whiteHeart} alt="filledHeart" /> */}
                  <img src={notification} alt="notification" />
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
                        borderRadius: "20px",
                        padding: "10px",
                        gap: "10px",
                      }}
                    >
                      <Button
                        styles={{
                          fontSize: "14px",
                        }}
                        _onClick={() => {
                          history.push(`/mypage/${userInfo?.userId}`);
                          setDrop(prev => !prev);
                        }}
                      >
                        마이페이지
                      </Button>
                      <Button
                        styles={{
                          fontSize: "14px",
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
                <Flex styles={{ width: "fit-content" }}>
                  <Button
                    styles={{
                      width: "70px",
                      height: "35px",
                      borderRadius: "30px",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                    _onClick={clickLogin}
                  >
                    로그인
                  </Button>
                </Flex>
              )}
            </Flex>
          ) : null}
        </Desktop>
      </Flex>
    </Flex>
  );
};

export default Header;
