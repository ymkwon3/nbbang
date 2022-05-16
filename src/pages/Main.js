/* global kakao */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { PostWrite, SideNav } from "../components";
import { Flex, Button } from "../elements";
import PostDetail from "../components/PostDetail";

import { actionCreator as postActions } from "../redux/modules/post";
import RadioInput from "../components/RadioInput";
import MyLocation from "../components/MyLocation";

//style
import ChatBox from "../components/ChatBox";
import { right, left, markerBlue, markerOrange, myPosition } from "../image";
import {BiCurrentLocation} from "react-icons/bi";

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const geocoder = new kakao.maps.services.Geocoder();

  // 유저위치를 처음 지정할 때 한번만 실행
  const firstRef = React.useRef(true);

  // 카카오맵 컨트롤을 위한 ref
  const containerRef = React.useRef(null);
  const mapRef = React.useRef(null);

  // 카테고리에 따라 마커를 띄워주기 위해 저장해두는 마커 리스트
  const markerListRef = React.useRef([]);

  /* 왼쪽 사이드네비 전체를 관리하기 위한 ref, state
  상세, 글쓰기 페이지를 관리하기 위한 ref, state */
  const sideNavRef = React.useRef(null);
  const [sideNav, setSideNav] = React.useState(false);
  const leftContianerRef = React.useRef(null);
  const [leftContainer, setLeftContainer] = React.useState("writer");

  // 채팅방 오픈
  const [openChatroom, setOpenChatroom] = React.useState(false);

  // 채팅창 오픈 상태 여부  체크
  const [isChatButtonClicked, setIsChatButtonClicked] = React.useState(false);

  /*해당 지역의 전체 게시물, 현재 선택된 카테고리, 
  게시물 지역 범위, 현재 위치 구분*/
  const postList = useSelector(state => state.post.postList);
  const category = useSelector(state => state.post.category);
  const [cityRange, setCityRange] = React.useState(3);
  const [city, setCity] = React.useState(3);

  // 로그인된 유저 정보
  const userInfo = useSelector(state => state.user.userInfo);

  const cateList = postList.filter(
    v => v.category === category || category === "all"
  );

  // 글쓰기 상세보기 컨테이너 펼치기 및 컴포넌트 변경
  const clickContainer = (type, postId) => {
    const con = leftContianerRef.current.style.width;
    if (con === "0px") leftContianerRef.current.style.width = "430px";
    if (type === "detail") {
      // 다른 게시물이 선택되면 채팅방 닫기
      setOpenChatroom(false);
      dispatch(postActions.getPostDetailDB(postId));
    } else if (type === "close") leftContianerRef.current.style.width = "0px";
    setLeftContainer(type);
  };
  // sidenav 전체 접어두기, 펼치기
  const clickFold = (markerClick) => {
    if (sideNavRef.current.style.width === "0px" || markerClick) {
      sideNavRef.current.style.width = "fit-content";
      setSideNav(false);
      isChatButtonClicked ? setOpenChatroom(true) : setOpenChatroom(false);
    } else {
      sideNavRef.current.style.width = "0px";
      setSideNav(true);
      setOpenChatroom(false);
    }
  };
  // 게시물 선택 시 위치 이동
  const clickPost = (lat, lng) => {
    const userPosition = new kakao.maps.LatLng(lat, lng);
    mapRef.current.panTo(userPosition);
  };

  const clickMyLocation = (lat, lon) => {
    navigator.geolocation.getCurrentPosition(
      position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude; 
      
      const moveLatLng = new kakao.maps.LatLng(lat, lon);   
      mapRef.current.setCenter(moveLatLng);
    })
  };
  

  /*
  현재 로그인 상태일 때, 게시물 데이터를 두 번 불러옴.
  userInfo를 updateMount에 지정해주지 않으면 무조건 비회원일 때의 데이터를 불러옴
  --IsLogin 컴포넌트에서 재로그인요청 시 자식 컴포넌트를 없애줌으로써 문제 해결
  */
  React.useEffect(() => {
    // 브라우저 geolocation을 이용해 현재 위치 좌표 불러오기
    navigator.geolocation.getCurrentPosition(
      position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        // const userLng = 126.89156781562811;
        // const userLat = 37.512634390346236;
        // 사용자 좌표를 주소로 변환 후 서버에 요청 (해당 주소의 게시물들 불러오게)

        geocoder.coord2Address(userLng, userLat, (result, status) => {
          // 지번 주소
          const addr = result[0].address;
          dispatch(
            postActions.getPostListDB({
              address: addr.address_name,
              range: cityRange,
              userId: userInfo?.userId,
            })
          );

          // 해당 지역들은 특별시, 광역시, 자치시라 보여지는 범위를 3단계로 분류
          const locale = [
            "서울",
            "인천",
            "대전",
            "광주",
            "부산",
            "울산",
            "대구",
            "제주특별자치도",
          ];
          locale.find(v => v === addr.region_1depth_name)
            ? setCity(3)
            : setCity(2);
        });
        if (firstRef.current) {
          const userPosition = new kakao.maps.LatLng(userLat, userLng);
          const options = {
            center: userPosition,
            level: 4,
          };
          mapRef.current = new kakao.maps.Map(containerRef.current, options);

          mapRef.current.panTo(userPosition);

          const markerPosition = userPosition;
          const markerImage = new kakao.maps.MarkerImage(
            myPosition,
            new kakao.maps.Size(40, 50)
          );
          const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
          });
          marker.setMap(mapRef.current);
          firstRef.current = false;
        }
      },
      () => {},
      { enableHighAccuracy: true }
    );
  }, [cityRange]);

  React.useEffect(() => {
    // DB에서 받아오는 게시글들을 마커로 표시 후 띄워줌
    // 게시물이 바뀔 때마다, 마커들을 초기화 시킨 후 시작
    markerListRef.current.map((m) => {
      m.setMap(null);
      return null;
    });
    markerListRef.current = [];
    cateList.map(v => {
      // 마커크기 45 x 60
      const markerImage = new kakao.maps.MarkerImage(
        v.category === "eat" ? markerOrange : markerBlue,
        new kakao.maps.Size(45, 60)
      );
      const m = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(v.lat, v.lng),
        image: markerImage,
      });
      markerListRef.current.push(m);
      m.setMap(mapRef.current);

      // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      let iwContent = `<div class="info-window flex-column-center">
      <img src=${v.image}></img>
      <div>${v.title}</div>
      </div>`;

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
      kakao.maps.event.addListener(m, "click", function () {
        // 마커 클릭 시 해당 게시물의 상세페이지를 불러옵니다.
        clickContainer("detail", v.postId);
        clickFold(true);
      });

      return null;
    });
  }, [postList, category]);

  return (
    <KaKaoMap ref={containerRef}>
      <LeftContainer ref={sideNavRef}>
        <SideNav
          category={category}
          postList={cateList}
          _onClickWrite={() => clickContainer("write")}
          _onClickDetail={clickContainer}
          _clickPost={clickPost}
        ></SideNav>
        <FoldBtn className="hover-event" onClick={() => clickFold(false)}>
          <img src={sideNav ? right : left} alt="foldBtn" />
        </FoldBtn>
        <div
          ref={leftContianerRef}
          style={{
            width: "0",
            height: "100%",
            position: "relative",
            transition: "0.2s",
            overflow: "hidden",
            zIndex: "8",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Flex
            styles={{
              width: "430px",
              height: "100%",
              background: "rgba(231, 232, 244, 0.5)",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 10,
              flexDirection: "column",
            }}
          >
            {leftContainer === "write" ? (
              <PostWrite
                map={mapRef.current}
                userInfo={userInfo}
                _clickContainer={() => clickContainer("close")}
                _clickFold={clickFold}
                _setRightContainer={setLeftContainer}
              ></PostWrite>
            ) : leftContainer === "detail" ? (
              <PostDetail
                openChatroom={openChatroom}
                setOpenChatroom={setOpenChatroom}
                _clickContainer={() => clickContainer("close")}
                setIsChatButtonClicked={setIsChatButtonClicked}
              ></PostDetail>
            ) : null}
          </Flex>
        </div>
      </LeftContainer>
      <ButtonContainer>
        <Button 
          styles={{
            width:"52px",
            height:"52px",
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
            margin:"0 0 10px",
            borderRadius:"15px"
          }} 
          _onClick={() => clickMyLocation()}
        ><BiCurrentLocation/></Button>
        <RadioInput city={city} setCityRange={setCityRange}></RadioInput>
      </ButtonContainer>
    </KaKaoMap>
  );
};

const KaKaoMap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const FoldBtn = styled.div`
  z-index: 9;
  position: absolute;
  top: calc(50% - 28px);
  right: -33px;
`;

const LeftContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: start;
  width: fit-content;
  height: 100%;
`;

const ButtonContainer = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 10;
`;

export default Main;
