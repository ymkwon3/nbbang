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
import { ToastMessage } from "../components/ToastMessage";
import {Desktop, Mobile} from "../shared/Responsive"
import FooterNavi from "../components/FooterNavi";

const App = () => {
  const isDesktop = Desktop(0);
  console.log(isDesktop)
  return (
    <Flex
      styles={{ height: "100vh", flexDirection: "column", justifyContent: "start", position: "relative" }}
    >
      <ToastMessage/>
      <Header/>
      <Flex
        styles={{
          height: isDesktop === undefined ? "calc(100% - 50px)" : "calc(100% - 100px)"
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
      <Mobile><FooterNavi/></Mobile>
    </Flex>
  );
};

export default App;
