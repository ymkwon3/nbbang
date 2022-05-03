/* global kakao */
import React from "react";
import styled from "styled-components";
import { PostWrite, PostDetails, SideNav, Header } from "../components";
import { Flex } from "../elements";

const Main = () => {
  const geocoder = new kakao.maps.services.Geocoder();

  const containerRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const sideNavRef = React.useRef(null);
  // mapRef에 카카오맵을 저장한 후 PostWrite에 넘겨주기 위한 강제 리렌더링
  const [rerender, setRerender] = React.useState(null);

  const data = [
    {
      lat: "35.17871433853833",
      lng: "128.09299350446415",
      name: "진주고속버스터미널",
    },
    {
      lat: "35.17650905647908",
      lng: "128.0956643907376",
      name: "경상국립대학교병원",
    },
  ];

  React.useEffect(() => {
    // 브라우저 geolocation을 이용해 현재 위치 좌표 불러오기
    navigator.geolocation.getCurrentPosition(
      position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        // 사용자 좌표를 주소로 변환 후 서버에 요청 (해당 주소의 게시물들 불러오게)
        geocoder.coord2Address(userLng, userLat, (result, status) => {
          // 지번 주소
          const addr = result[0].address;

          // 경남 진주, 서울 종로구 형식
          // addrRef.current.value = addr.address_name;
          
        });
        const userPosition = new kakao.maps.LatLng(userLat, userLng);
        const options = {
          center: userPosition,
          level: 3,
        };
        mapRef.current = new kakao.maps.Map(containerRef.current, options);
        setRerender(true);

        const markerPosition = userPosition;
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(mapRef.current);

        // DB에서 받아오는 게시글들을 마커로 표시 후 띄워줌
        data.map(v => {
          const m = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(v.lat, v.lng),
            title: v.name,
          });
          m.setMap(mapRef.current);
          let iwContent = `<div style="padding:5px;">${v.name}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

          // 인포윈도우를 생성합니다
          let infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: false,
          });

          // 마커에 이벤트를 등록합니다
          kakao.maps.event.addListener(m, "mouseover", function () {
            // 마커 위에 인포윈도우를 표시합니다
            infowindow.open(mapRef.current, m);
          });
          kakao.maps.event.addListener(m, "mouseout", function () {
            // 마커 위에 인포윈도우를 제거합니다
            infowindow.close();
          });
        });
      },
      () => {},
      { enableHighAccuracy: true }
    );
  }, []);

  const tempEvent = () => {
    if (sideNavRef.current.style.width === "0px")
      sideNavRef.current.style.width = "430px";
    else sideNavRef.current.style.width = 0;
  };

  return (
    // <KaKaoMap ref={containerRef}>
    <>
      <Header></Header>
      {/* <PostDetails></PostDetails> */}

      <Flex
        styles={{
          position: "relative",
          justifyContent: "start",
          height: "100%",
        }}
      >
        <SideNav></SideNav>
        <div
          ref={sideNavRef}
          style={{
            width: "0",
            height: "100%",
            position: "relative",
            transition: "0.2s",
            overflow: "hidden",
          }}
        >
          {/* <PostDetails></PostDetails> */}
          <PostWrite rerender={rerender} map={mapRef.current}></PostWrite>
        </div>
      </Flex>
      <button
        style={{ position: "absolute", right: 50, bottom: 50, zIndex: 10 }}
        onClick={tempEvent}
      >
        temp
      </button>
    </>
    // </KaKaoMap>
  );
};

const KaKaoMap = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

export default Main;
