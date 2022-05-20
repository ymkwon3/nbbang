import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { Flex } from "../elements";
import { Header } from "../components";
import { Route } from "react-router";
import Main from "../pages/Main";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import IsLogin from "./IsLogin";
import { ToastMessage } from "../components/ToastMessage";
import { Desktop, Mobile } from "../shared/Responsive";
import FooterNavi from "../components/FooterNavi";
import Modal from "./Modal";
import Loading from "../components/Loading";
import KaKaoUri from "../pages/KakaoUri";

const App = () => {
  const isDesktop = Desktop(0);
  const isLoading = useSelector(state => state.post.isLoading);
  return (
    <Flex
      styles={{
        height: "100vh",
        flexDirection: "column",
        justifyContent: "start",
        position: "relative",
      }}
    >
      <ToastMessage />
      <Header />

      <Flex
        styles={{
          height:
            isDesktop === undefined
              ? "calc(100% - 50px)"
              : "calc(100% - 100px)",
        }}
      >
        <IsLogin>
          <Route path="/" exact component={Main}></Route>
          <Route path="/mypage/:userId" exact component={MyPage}></Route>
          <Route path="/kakao-auth/kakao/callback" exact component={KaKaoUri}></Route>
        </IsLogin>
        <Route path="/login" exact component={Login}></Route>
      </Flex>
      <Mobile>
        <FooterNavi />
      </Mobile>
      {isLoading ? (
        <Modal>
          <Loading />
        </Modal>
      ) : null}
    </Flex>
  );
};

export default App;
