import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { Flex, Text } from "../elements";
import { Header } from "../components";
import { Route } from "react-router";
import Main from "../pages/Main";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import Info from "../pages/Info";
import IsLogin from "./IsLogin";
import { ToastMessage } from "../components/ToastMessage";
import { Desktop, Mobile } from "../shared/Responsive";
import FooterNavi from "../components/FooterNavi";
import Modal from "./Modal";
import Loading from "../components/Loading";
import KaKaoUri from "../pages/KakaoUri";
import { secondaryColor } from "./color";


const App = () => {
  const isDesktop = Desktop(0);
  const isLoading = useSelector(state => state.post.isLoading);
  const isGrant = useSelector(state => state.user.isGrant);
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
          <Route
            path="/kakao-auth/kakao/callback"
            exact
            component={KaKaoUri}
          ></Route>
        </IsLogin>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/info" exact component={Info}></Route>
      </Flex>
      <Mobile>
        <FooterNavi />
      </Mobile>
      {!isGrant ? (
        <Modal>
          <Loading>
            <Text
              styles={{
                fontFamily: "Cafe24SsurroundAir",
                fontWeight: "700",
                fontSize: isDesktop === undefined ? "18px" : "14px",
              }}
            >
              브라우저{" "}
              <Text
                styles={{
                  fontFamily: "Cafe24SsurroundAir",
                  fontWeight: "700",
                  fontSize: isDesktop === undefined ? "18px" : "14px",
                  color: secondaryColor,
                }}
              >
                위치 권한 허용
              </Text>{" "}
              후 새로고침 해주세요!
            </Text>
          </Loading>
        </Modal>
      ) : isLoading ? (
        <Modal>
          <Loading>
            <Text
              styles={{
                fontFamily: "Cafe24SsurroundAir",
                fontWeight: "700",
                fontSize: isDesktop === undefined ? "18px" : "14px",
              }}
            >
              로딩중...
            </Text>
          </Loading>
        </Modal>
      ) : null}
    </Flex>
  );
};

export default App;
