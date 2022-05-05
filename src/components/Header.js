import React from "react";
import { useSelector } from "react-redux";
import { Button, Flex, Image } from "../elements";
import { removeToken } from "../shared/localStorage";
import styled from "styled-components";

import { RiSearchLine } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";

import { useHistory } from "react-router-dom";

const Header = props => {
  const history = useHistory();
  const userInfo = useSelector(state => state.user.userInfo);
  const isLogin = useSelector(state => state.user.isLogin);

  const clickLogout = {};

  const clickLogin = () => {
    history.push("/login");
  };

  return (
    <Flex
      styles={{
        height: "60px",
        backgroundColor: "#19253D",
        boxShadow: "0 8px 10px -4px rgba(0, 0, 0, 0.2)",
        zIndex: 11,
        position: "absolute",
        padding: "0 20px"
      }}
    >
      <Flex styles={{ justifyContent: "start", gap: "15px"}}>
        <div>로고들어가는부분</div>
        <SearchInput>
          <input placeholder="검색어를 입력해주세요" />
          <RiSearchLine size="27.22" color="#19253D" />
        </SearchInput>
        <Button
          styles={{
            width: "145px",
            height: "40px",
            borderRadius: "30px",
            color: "#fff",
            backgroundColor: "#FF5C00",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          전체
        </Button>
        <Button
          styles={{
            width: "145px",
            height: "40px",
            borderRadius: "30px",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          같이 사자
        </Button>
        <Button
          styles={{
            width: "145px",
            height: "40px",
            borderRadius: "30px",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          같이 먹자
        </Button>
      </Flex>
      {isLogin ? (
        <Flex styles={{ gap: "15px", width: "fit-content" }}>
          <AiOutlineHeart color="#fff" size="25" />
          <IoMdNotifications color="#fff" size="25" />
          <Image
            styles={{ width: "38px", height: "38px" }}
            src={userInfo.userImage}
          ></Image>
        </Flex>
      ) : (
        <Flex styles={{ width: "fit-content" }}>
          <Button styles={{width: "100px", height: "40px"}} _onClick={clickLogin}>로그인</Button>
        </Flex>
      )}
    </Flex>
  );
};

const SearchInput = styled.div`
  position: relative;
  margin: 0 20px;
  & > input {
    width: 380px;
    height: 40px;
    border-radius: 30px;
    padding: 0 40px;
    border: none;
    outline: none;
  }

  & > *:nth-child(2) {
    position: absolute;
    right: 10px;
    top: 6px;
  }
`;

export default Header;
