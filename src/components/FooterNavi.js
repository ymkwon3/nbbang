import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Flex } from "../elements";

import { primaryDarked } from "../shared/color";
import { home, homeWhite, info, infoWhite, userpage, userpageWhite } from "../image";

const FooterNavi = props => {
  const history = useHistory();
  const location = useLocation().pathname;
  const userInfo = useSelector(state => state.user.userInfo);
  const isLogin = useSelector(state => state.user.isLogin);
  // Home버튼을 눌렀을 경우
  const clickHome = () => {
    if (location !== "/") {
      history.push("/");
    }
  };

  // Mypage버튼을 눌렀을 경우
  const clickMypage = () => {
    if (!location.includes("mypage")) {
      history.push(`/mypage/${userInfo?.userId}`);
    }
  };

  // Login버튼을 눌렀을 경우
  const clickLogin = () => {
    if (!location.includes("login")) {
      history.push("/login");
    }
  };

  const clickInfo = () => {
    if (!location.includes("info")) {
      history.push("/info")
    }
  };

  const checkedStyle = {
    backgroundColor: primaryDarked,
    color: "#fff",
  };

  return (
    <Flex
      styles={{
        position: "sticky",
        bottom: "0",
        minHeight: "50px",
        justifyContent: "space-around",
        zIndex: "100",
        boxShadow: "0 8px 10px 4px rgba(0, 0, 0, 0.5)",
        backgroundColor: "#fff",
      }}
    >
      
      <FooterBtn style={location === "/info" ? checkedStyle : null} onClick={clickInfo}>
        {location === "/info" ? (
          <img alt="info" src={infoWhite}></img>
        ) : (
          <img alt="info" src={info}></img>
        )}
        Info
      </FooterBtn>
      <FooterBtn
        style={location === "/" ? checkedStyle : null}
        onClick={clickHome}
      >
        {location === "/" ? (
          <img alt="home" src={homeWhite}></img>
        ) : (
          <img alt="home" src={home}></img>
        )}
        Home
      </FooterBtn>
      {isLogin ? (
        <FooterBtn
          style={location.includes("mypage") ? checkedStyle : null}
          onClick={clickMypage}
        >
          {location.includes("mypage") ? (
         <img alt="userpage" src={userpageWhite}></img>
        ) : (
          <img alt="userpage" src={userpage}></img>
        )}
          
          MyPage
        </FooterBtn>
      ) : (
        <FooterBtn
          style={location === "/login" ? checkedStyle : null}
          onClick={clickLogin}
        >
          Login
        </FooterBtn>
      )}
    </Flex>
  );
};

const FooterBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background-color: inherit;
  color: ${primaryDarked};
  font-weight: 700;

  font-size: 12px;
  cursor: pointer;
`;

export default FooterNavi;
