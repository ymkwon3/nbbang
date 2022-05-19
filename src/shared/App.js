import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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
import { Desktop, Mobile } from "../shared/Responsive";
import FooterNavi from "../components/FooterNavi";
import Spinner from "../components/Spinner";

const App = () => {
  const isDesktop = Desktop(0);
  const isLoaded = useSelector(state => state.post.is_loaded)
  return (
    <Flex
      styles={{
        height: "100vh",
        flexDirection: "column",
        justifyContent: "start",
        position: "relative",
      }}
    >
      <ToastMessage/>
      <Header/>
      {/* {isLoaded ? (<Spinner/>) : null} */}
      <Flex
        styles={{
          height:
            isDesktop === undefined
              ? "calc(100% - 50px)"
              : "calc(100% - 100px)",
        }}
      >
        {/* <Route path="/mypage" exact component={MyPage}></Route> */}
        <IsLogin>
          <Route path="/" exact component={Main}></Route> 
          <Route path="/mypage/:userId" exact component={MyPage}></Route>
        </IsLogin>
        <Route path="/login" exact component={Login}></Route>
      </Flex>
      <Mobile>
        <FooterNavi />
      </Mobile>
    </Flex>
  );
};

export default App;
