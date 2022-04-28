/* global kakao */
import React from "react";
import { Flex } from "../elements";

const PostWrite = props => {
  const { map } = props;
  const geocoder = new kakao.maps.services.Geocoder();
  const addrRef = React.useRef(null);
  const markerRef = React.useRef(null);
  const [findState, setFindState] = React.useState(false);

  function handler(e) {
    // 클릭된 위치의 좌표를 가져옴
    const coords = e.latLng;
    const lng = coords.getLng();
    const lat = coords.getLat();

    // 주소 선택 시 생성되는 마커를 하나만 유지합니다.
    if (markerRef.current) markerRef.current.setMap(null);

    // 좌표를 통해 상세 가져오기
    geocoder.coord2Address(lng, lat, (result, status) => {
      // 도로명 주소
      const road_addr = result[0].road_address;
      // 지번 주소
      const addr = result[0].address;

      // addrRef.current.value = addr.address_name;
      addrRef.current.value = addr.address_name;
      markerRef.current = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng),
      });
      markerRef.current.setMap(map);
    });

    // 한 번만 클릭 한 후 클릭이벤트 제거
    kakao.maps.event.removeListener(map, "click", handler);
    setFindState(false);
  }

  React.useEffect(() => {
    if (findState) {
      // 지도 클릭 이벤트 추가
      kakao.maps.event.addListener(map, "click", handler);
    }
  }, [findState]);

  return (
    <Flex
      styles={{
        width: "400px",
        height: "100%",
        backgroundColor: "#fff",
        opacity: "0.95",
        position: "absolute",
        top: 0,
        left: "500px",
        zIndex: "10",
        flexDirection: "column",
      }}
    >
      <input placeholder="제목"></input>
      <input placeholder="카테고리 드롭다운"></input>
      <select>
        <option value="buy">같이 사자</option>
        <option value="eat">같이 먹자</option>
      </select>
      <input placeholder="가격"></input>
      <input placeholder="n명 드롭다운"></input>
      <input placeholder="기간 일수"></input>
      <input placeholder="주소 지도" ref={addrRef}></input>
      <button onClick={() => setFindState(true)}>주소가져오기</button>
      <input placeholder="상세위치"></input>
      <input placeholder="내용"></input>
      <input placeholder="사진"></input>
    </Flex>
  );
};

export default PostWrite;
