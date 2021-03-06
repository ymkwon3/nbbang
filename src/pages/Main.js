/* global kakao */
import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PostWrite, SideNav } from "../components";
import { Flex, Button } from "../elements";
import PostDetail from "../components/side/PostDetail";
import Info from "../components/modal/Info";
import { actionCreator as postActions } from "../redux/modules/post";
import { actionCreator as userActions } from "../redux/modules/user";
import RadioInput from "../components/RadioInput";

//style
import styled from "styled-components";
import { Desktop } from "../shared/Responsive";
import { right, left, position, info } from "../image";
import { askBread } from "../image/bread";
import { buyMarker, eatMarker, positionMarker } from "../image/marker";
import io from "socket.io-client";
import Modal from "../shared/Modal";
import Explain from "../components/modal/Explain";

// 배포서버에 들어갈 주소 ※매우중요 안지키면 병걸림
const socket = io.connect("https://redpingpong.shop");

// 테스트서버에 들어갈 주소 ※매우중요 안지키면 병걸림
// const socket = io.connect("https://lyubov.shop");

const Main = () => {
  const dispatch = useDispatch();
  const geocoder = new kakao.maps.services.Geocoder();

  // 반응형을 위한
  const isDesktop = Desktop(0);

  // 유저위치를 처음 지정할 때 한번만 실행
  const userPositionRef = React.useRef(null);

  // 카카오맵 컨트롤을 위한 ref
  const containerRef = React.useRef(null);
  const mapRef = React.useRef(null);

  // 카테고리에 따라 마커를 띄워주기 위해 저장해두는 마커 리스트
  const markerListRef = React.useRef([]);

  // 인포페이지, 설명페이지 모달 state
  const [infoPage, setInfoPage] = React.useState(false);
  const [exp, setExp] = React.useState(false);

  // 유저의 현재 주소 표시
  const userLocation = React.useRef(null);

  /* 왼쪽 사이드네비 전체를 관리하기 위한 ref, state
  상세, 글쓰기 페이지를 관리하기 위한 ref, state */
  const sideNavRef = React.useRef(null);
  const [sideNav, setSideNav] = React.useState(false);
  const leftContainerRef = React.useRef(null);
  const [leftContainer, setLeftContainer] = React.useState("writer");

  // 채팅방 오픈
  const [openChatroom, setOpenChatroom] = React.useState(false);

  // 채팅창 오픈 상태 여부  체크
  const [isChatButtonClicked, setIsChatButtonClicked] = React.useState(false);

  /*해당 지역의 전체 게시물, 현재 선택된 카테고리, 
  게시물 지역 범위, 현재 위치 구분*/
  const postList = useSelector((state) => state.post.postList);
  const category = useSelector((state) => state.post.category);
  const [range, setRange] = React.useState(true);
  const cityRange = React.useRef(1);
  const [city, setCity] = React.useState(3);

  // 로그인된 유저 정보
  const userInfo = useSelector((state) => state.user.userInfo);

  const cateList = postList.filter(
    (v) => v.category === category || category === "all"
  );

  // 글쓰기 상세보기 컨테이너 펼치기 및 컴포넌트 변경
  const clickContainer = (type, postId) => {
    const con = leftContainerRef.current.style.width;
    if (con === "0px") leftContainerRef.current.style.width = "90vw";
    if (type === "detail") {
      // 다른 게시물이 선택되면 채팅방 닫기
      setOpenChatroom(false);
      dispatch(postActions.getPostDetailDB(postId));
    } else if (type === "close") leftContainerRef.current.style.width = "0px";
    setLeftContainer(type);
  };

  // sidenav 전체 접어두기, 펼치기
  const clickFold = (markerClick) => {
    if (sideNavRef.current.style.maxWidth === "0px" || markerClick) {
      sideNavRef.current.style.maxWidth = "fit-content";
      leftContainerRef.current.style.display = "block";
      setSideNav(false);
      isChatButtonClicked ? setOpenChatroom(true) : setOpenChatroom(false);
    } else {
      sideNavRef.current.style.maxWidth = "0px";
      leftContainerRef.current.style.display = "none";
      setSideNav(true);
      setOpenChatroom(false);
    }
  };
  // 게시물 선택 시 위치 이동
  const clickPost = (lat, lng) => {
    const userPosition = new kakao.maps.LatLng(lat, lng);
    mapRef.current.panTo(userPosition);
  };

  // 내 위치 이동
  const clickMyLocation = () => {
    mapRef.current.panTo(userPositionRef.current);
  };

  // 인포페이지 모달
  const clickInfoPage = () => {
    setInfoPage(true);
  };

  const clickExp = () => {
    setExp(true);
  };

  // 소켓으로부터 알림 받는 부분
  React.useEffect(() => {
    socket.emit("socket is connected", userInfo);
    socket.on("send message alarm", (messageNoti) => {
      dispatch(userActions.addAlarm(messageNoti[0]));
    });
    socket.on("leaved chatroom", (leaveNoti) => {
      dispatch(userActions.addAlarm(leaveNoti[0]));
    });
    socket.on("added_new_participant", (addedNewParticiparntNoti) => {
      dispatch(userActions.addAlarm(addedNewParticiparntNoti[0]));
    });
    socket.on("disconnect", () => {
      socket.emit("socket is connected", userInfo);
    });

    // 비로그인일때, 메인페이지 접속 시 설명페이지 보여주기
    if (!userInfo.userId) {
      setExp(true);
    }

    return () => {
      socket.off("send message alarm");
      socket.off("leaved chatroom");
      socket.off("added_new_participant");
      socket.off("disconnect");
    };
  }, []);
  /*
  현재 로그인 상태일 때, 게시물 데이터를 두 번 불러옴.
  userInfo를 updateMount에 지정해주지 않으면 무조건 비회원일 때의 데이터를 불러옴
  --IsLogin 컴포넌트에서 재로그인요청 시 자식 컴포넌트를 없애줌으로써 문제 해결
  */

  React.useEffect(() => {
    // 브라우저 geolocation을 이용해 현재 위치 좌표 불러오기
    dispatch(postActions.isLoading(true));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 배포서버에 들어갈 위치 ※매우중요 안지키면 발가락 문지방에 찧임
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          // 테스트 진주
          // const userLng = 128.09542887654473;
          // const userLat = 35.17814477781777;

          // 테스트 서울 남성멘션
          // const userLng = 126.89158782940078;
          // const userLat = 37.51265421586233;

          // 사용자 좌표를 주소로 변환 후 서버에 요청 (해당 주소의 게시물들 불러오게)
          geocoder.coord2Address(userLng, userLat, (result, status) => {
            // 지번 주소
            const addr = result[0].address;

            // 현재 위치 표기
            userLocation.current = {
              province: addr.region_1depth_name,
              city: addr.region_2depth_name,
              town: addr.region_3depth_name,
            };

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

            if (locale.find((v) => v === addr.region_1depth_name)) {
              setCity(3);
            } else {
              setCity(2);
              cityRange.current === 1 && (cityRange.current = 2);
            }

            dispatch(
              postActions.getPostListDB({
                address: addr.address_name,
                range: cityRange.current,
                userId: userInfo?.userId,
                lat: userLat,
                lng: userLng,
              })
            );
          });

          //제일 처음 한 번만 실행
          if (!userPositionRef.current && containerRef.current) {
            const userPosition = new kakao.maps.LatLng(userLat, userLng);
            const options = {
              center: userPosition,
              level: 6,
            };

            userPositionRef.current = userPosition;
            mapRef.current = new kakao.maps.Map(containerRef.current, options);

            mapRef.current.panTo(userPosition);

            const markerPosition = userPosition;
            const markerImage = new kakao.maps.MarkerImage(
              positionMarker,
              new kakao.maps.Size(40, 50)
            );
            const marker = new kakao.maps.Marker({
              position: markerPosition,
              image: markerImage,
            });
            marker.setMap(mapRef.current);
          }
        },
        () => {
          navigator.permissions.query({ name: "geolocation" }).then((res) => {
            if (res.state === "denied") {
              dispatch(userActions.isGranting(false));
              // 코드상으로 어쩔수 없다면 모달창으로 라도 안내해야함 "브라우저 위치권한 허용 후 새로고침 해주세요" 라고
            }
          });
        },
        { enableHighAccuracy: true }
      );
    }
  }, [range]);

  React.useEffect(() => {
    // DB에서 받아오는 게시글들을 마커로 표시 후 띄워줌
    // 게시물이 바뀔 때마다, 마커들을 초기화 시킨 후 시작
    markerListRef.current.map((m) => {
      m.setMap(null);
      return null;
    });
    markerListRef.current = [];
    cateList.map((v) => {
      // 마커크기 45 x 60
      const markerImage = new kakao.maps.MarkerImage(
        v.category === "eat" ? eatMarker : buyMarker,
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
          ref={leftContainerRef}
          style={{
            maxWidth: "360px",
            width: "0",
            height: "100%",
            position: isDesktop === undefined ? "relative" : "absolute",
          }}
        >
          <Flex
            styles={{
              width: "100%",
              height: "100%",
              background: "rgba(245, 236, 229, 0.8)",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
              position: "absolute",
              overflow: "hidden",
              top: 0,
              left: 0,
              zIndex: 10,
              flexDirection: "column",
            }}
          >
            {leftContainer === "write" ? (
              <PostWrite
                map={mapRef.current}
                container={containerRef}
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
                socket={socket}
              ></PostDetail>
            ) : null}
          </Flex>
        </div>
      </LeftContainer>
      <AdressContainer>
        {userLocation.current ? (
          <Flex
            styles={{
              height: "40px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "5px",
              padding: "20px",
              gap: "10px",
            }}
          >
            <Flex
              styles={{
                whiteSpace: "nowrap",
                fontFamily: "Cafe24SsurroundAir",
                fontWeight: "600",
              }}
            >
              {userLocation.current.province}
            </Flex>
            <span>&gt;</span>
            <Flex
              styles={{
                whiteSpace: "nowrap",
                fontFamily: "Cafe24SsurroundAir",
                fontWeight: "600",
              }}
            >
              {userLocation.current.city}
            </Flex>
            <span>&gt;</span>
            <Flex
              styles={{
                whiteSpace: "nowrap",
                fontFamily: "Cafe24SsurroundAir",
                fontWeight: "600",
              }}
            >
              {userLocation.current.town}
            </Flex>
          </Flex>
        ) : null}
      </AdressContainer>
      <ButtonContainer>
        {/*인포페이지이동버튼*/}
        <Desktop>
          <Flex
            styles={{
              width: "50px",
              height: "50px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px",
              margin: "0 0 10px",
            }}
          >
            <Button _onClick={clickInfoPage}>
              <img
                style={{
                  width: "35px",
                  height: "35px",
                }}
                alt="info"
                src={info}
              ></img>
            </Button>
          </Flex>
        </Desktop>

        <Flex
          styles={{
            width: "50px",
            height: "50px",
            backgroundColor: "#fff",
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "10px",
            margin: "0 0 10px",
          }}
        >
          <Button _onClick={clickExp}>
            <img
              style={{
                width: "35px",
                height: "35px",
              }}
              alt="askBread"
              src={askBread}
            ></img>
          </Button>
        </Flex>

        {/*현재위치이동버튼*/}
        <Flex
          styles={{
            width: "50px",
            height: "50px",
            backgroundColor: "#fff",
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "10px",
            margin: "0 0 10px",
          }}
        >
          <Button _onClick={() => clickMyLocation()}>
            <img
              style={{
                width: "35px",
                height: "35px",
              }}
              alt="position"
              src={position}
            ></img>
          </Button>
        </Flex>
        <RadioInput
          city={city}
          setCityRange={setRange}
          ref={cityRange}
          map={mapRef.current}
        ></RadioInput>
      </ButtonContainer>
      {infoPage && (
        <Modal close={() => setInfoPage(false)}>
          <Info></Info>
        </Modal>
      )}
      {exp && (
        <Modal close={() => setExp(false)}>
          <Explain close={() => setExp(false)}></Explain>
        </Modal>
      )}
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
  right: -32px;
`;

const LeftContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: start;
  max-width: fit-content;
  width: 90vw;
  height: 100%;
`;

const AdressContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 7;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 7;
`;

export default Main;
