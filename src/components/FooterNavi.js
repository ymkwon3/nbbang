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

  // Home버튼을 눌렀을 경우
  const clickHome = () => {
    if (location.pathname !== "/") history.push("/");
  };

  // Mypage버튼을 눌렀을 경우
  const clickMypage = () => {
    if (!location.pathname.includes("mypage"))
      history.push(`/mypage/${userInfo?.userId}`);
  };

  return (
    <Flex
      styles={{
        position: "sticky",
        bottom: "0",
        minHeight: "50px",
        justifyContent: "space-around",
        padding: "10px 0",
        zIndex: "100",
        boxShadow: "0 8px 10px 4px rgba(0, 0, 0, 0.5)",
        backgroundColor: "#fff",
      }}
    >
      <FooterBtn onClick={clickHome}>홈으로</FooterBtn>
      <FooterBtn>게시물</FooterBtn>
      
      <FooterBtn>알림</FooterBtn>
      {isLogin ? (
        <FooterBtn onClick={clickMypage}>마이페이지</FooterBtn>
      ) : (
        <FooterBtn
          onClick={() => {
            history.push("/login");
          }}
        >
          로그인
        </FooterBtn>
      )}
    </Flex>
  );
};

const FooterBtn = styled.button`
  width: 20%;
  height: 100%;
  border: none;
  outline: none;
  background-color: inherit;
  color: ${primaryDarked};
  font-weight: 700;
`;

export default FooterNavi;
