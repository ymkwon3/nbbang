/* global kakao */
import React from "react";
import "./App.css";
import { Flex } from "../elements";
import { Header } from "../components";
import { Route } from "react-router";
import Main from "../pages/Main";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import IsLogin from "./IsLogin";

const App = () => {
  // const geocoder = new kakao.maps.services.Geocoder();
  // navigator.geolocation.getCurrentPosition(
  //   position => {
  //     const userLat = position.coords.latitude;
  //     const userLng = position.coords.longitude;
  //     // 사용자 좌표를 주소로 변환 후 서버에 요청 (해당 주소의 게시물들 불러오게)
  //     geocoder.coord2Address(userLng, userLat, (result, status) => {
  //       // 지번 주소
  //       const addr = result[0].address;
  //       // 경남 진주, 서울 종로구 형식
  //       // addrRef.current.value = addr.address_name;
  //       dispatch(
  //         postActions.getPostListDB({
  //           address: addr.address_name,
  //           range: 3,
  //           userId: userInfo?.userId,
  //         })
  //       );
  //     });
  //     const userPosition = new kakao.maps.LatLng(userLat, userLng);
  //     const options = {
  //       center: userPosition,
  //       level: 3,
  //     };
  //     mapRef.current = new kakao.maps.Map(containerRef.current, options);
  //     setRerender(true);

  //     const markerPosition = userPosition;
  //     const marker = new kakao.maps.Marker({
  //       position: markerPosition,
  //     });
  //     marker.setMap(mapRef.current);
  //   },
  //   () => {},
  //   { enableHighAccuracy: true }
  // );
  return (
    <Flex styles={{ height: "100vh", flexDirection: "column",alignItems: "end" }}>
      <Header></Header>
      <Flex
        styles={{
          height: "calc(100% - 60px)",
        }}
      >
        <IsLogin>
          <Route path="/" exact component={Main}></Route>
          <Route path="/mypage" exact component={MyPage}></Route>
        </IsLogin>
        <Route path="/login" exact component={Login}></Route>
      </Flex>
    </Flex>
  );
};

export default App;
