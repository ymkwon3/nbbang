import React from "react";
import "./App.css";
import { Flex } from "../elements";
import { Header } from "../components";
import { Route } from "react-router";
import Main from "../pages/Main";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import ChatBox from "../components/ChatBox";
import IsLogin from "./IsLogin";

const App = () => {
  return (
    <Flex
      styles={{ height: "100vh", flexDirection: "column", justifyContent: "start" }}
    >
      <Header></Header>
      <Flex
        styles={{
          height: "calc(100% - 70px)"
        }}
      >
        {/* <Route path="/mypage" exact component={MyPage}></Route> */}
        <IsLogin>
          <Route path="/" exact component={Main}></Route>
          <Route path="/mypage/:userId" exact component={MyPage}></Route>
        </IsLogin>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/chat" exact component={ChatBox}></Route>
      </Flex>
    </Flex>
  );
};

export default App;
