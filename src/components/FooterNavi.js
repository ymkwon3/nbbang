import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Flex } from "../elements";

import { primaryColor, primaryDarked, secondaryColor } from "../shared/color";

const FooterNavi = props => {
  const history = useHistory();
  const location = useLocation();
  const userInfo = useSelector(state => state.user.userInfo);
  const isLogin = useSelector(state => state.user.isLogin);
  const [checked, setChecked] = React.useState("home");
  // Home버튼을 눌렀을 경우
  const clickHome = () => {
    if (location.pathname !== "/") {
      history.push("/");
      setChecked("home");
    }
  };

  // Mypage버튼을 눌렀을 경우
  const clickMypage = () => {
    if (!location.pathname.includes("mypage")) {
      history.push(`/mypage/${userInfo?.userId}`);
      setChecked("mypage");
    }
  };

  // Login버튼을 눌렀을 경우
  const clickLogin = () => {
    if (!location.pathname.includes("login")) {
      history.push("/login");
      setChecked("login");
    }
  };

  const clickNoti = () => {};

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
      <FooterBtn style={checked === "home" ? checkedStyle : null} onClick={clickHome}>
        Home
      </FooterBtn>
      <FooterBtn style={checked === "notification" ? checkedStyle : null}>
        Notification
      </FooterBtn>
      {isLogin ? (
        <FooterBtn
          style={checked === "mypage" ? checkedStyle : null}
          onClick={clickMypage}
        >
          MyPage
        </FooterBtn>
      ) : (
        <FooterBtn
          style={checked === "login" ? checkedStyle : null}
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
`;

export default FooterNavi;
