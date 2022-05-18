import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Flex } from "../elements";

import { primaryDarked } from "../shared/color";

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

  // const clickInfo = () => {};

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
      <FooterBtn style={ location === "/" ? checkedStyle : null} onClick={clickHome}>
        Home
      </FooterBtn>
      <FooterBtn style={location === "/info" ? checkedStyle : null}>
        Info
      </FooterBtn>
      {isLogin ? (
        <FooterBtn
          style={location.includes("mypage") ? checkedStyle : null}
          onClick={clickMypage}
        >
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
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background-color: inherit;
  color: ${primaryDarked};
  font-weight: 700;
  cursor: pointer;
`;

export default FooterNavi;
