import React from "react";
import { useSelector } from "react-redux";
import { Button, Flex, Image } from "../elements";
import { removeToken } from "../shared/localStorage";

const Header = props => {
  const userInfo = useSelector(state => state.user.userInfo);
  const isLogin = useSelector(state => state.user.isLogin);
  
  const clickLogout = {
    
  }

  return (
    <Flex
      styles={{
        height: "60px",
        backgroundColor: "#fff",
        zIndex: 10,
        position: "relative",
      }}
    >
      <Flex styles={{justifyContent: "start"}}>
      <div>로고들어가는부분</div>
      <input placeholder="대충 검색 부분"></input>
      <Button styles={{width: "80px", height: "30px", color: "#fff"}}>전체</Button>
      <Button styles={{width: "80px", height: "30px", color: "#fff"}}>같이 사자</Button>
      <Button styles={{width: "80px", height: "30px", color: "#fff"}}>같이 먹자</Button>
      </Flex>
      {isLogin ? <Image styles={{width: "50px", height: "50px"}} src={userInfo.userImage}></Image> : <Button>로그인</Button>}

    </Flex>
  );
};

export default Header;