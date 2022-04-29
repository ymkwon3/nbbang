/* global kakao */
import React from "react";
import { Flex, Input, Select } from "../elements";

const PostWrite = props => {
  const { map } = props;
  const geocoder = new kakao.maps.services.Geocoder();
  const markerRef = React.useRef(null);
  const positionRef = React.useRef(null);

  const submitRef = React.useRef({
    titleRef: null,
    categoryRef: null, //category
    priceRef: null, 
    headCountRef: null,
    endTimeRef: null,
    addressRef: null,
    addressDetailRef: null,
    contentRef: null,
    imageRef: null,
  });

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


      submitRef.current.addressRef.value = addr.address_name;
      positionRef.current = {lat, lng};
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

  // 전송하기 버튼 이벤트
  const clickSubmit = () => {
    console.log(submitRef.current)
    for(let ref in submitRef.current) {
      if(submitRef.current[ref].value === ""){
        console.log("빈 칸을 확인해주세요");
        return;
      }
    }
    console.log(submitRef.current.titleRef.value);
    console.log(submitRef.current.categoryRef.value);
    console.log(submitRef.current.priceRef.value);
    console.log(submitRef.current.headCountRef.value);
    console.log(submitRef.current.endTimeRef.value);
    console.log(submitRef.current.addressRef.value);
    console.log(submitRef.current.addressDetailRef.value);
    console.log(submitRef.current.contentRef.value);
    console.log(submitRef.current.imageRef.value);
    console.log(positionRef.current);
  };

  return (
    <Flex
      styles={{
        width: "430px",
        height: "100%",
        backgroundColor: "#fff",
        opacity: "0.95",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      <Flex styles={{ width: "60%", flexDirection: "column", gap: "20px" }}>
        <Input
          label="제목"
          ref={e => (submitRef.current.titleRef = e)}
        />
        <Select
          ref={e => (submitRef.current.categoryRef = e)}
          options={[
            { key: "같이 사자", value: "buy" },
            { key: "같이 먹자", value: "eat" },
          ]}
        />
        <Input
          label="가격"
          ref={e => (submitRef.current.priceRef = e)}
        />
        <Input
          label="인원"
          ref={e => (submitRef.current.headCountRef = e)}
        />
        <Input
          label="기간"
          ref={e => (submitRef.current.endTimeRef = e)}
        />
        <Input
          label="주소"
          ref={e => (submitRef.current.addressRef = e)}
          readOnly
        />
        <button onClick={() => setFindState(true)}>주소가져오기</button>
        <Input
          label="상세위치"
          ref={e => (submitRef.current.addressDetailRef = e)}
        />
        <Input
          label="내용"
          ref={e => (submitRef.current.contentRef = e)}
        />
        <Input
          label="사진"
          ref={e => (submitRef.current.imageRef = e)}
        />
        <button onClick={clickSubmit}>전송하기</button>
      </Flex>
    </Flex>
  );
};

export default PostWrite;
