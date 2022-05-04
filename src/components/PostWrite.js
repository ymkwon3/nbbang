/* global kakao */
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Flex, Image, Input, Select } from "../elements";
import { actionCreator as postActions } from "../redux/modules/post";

const PostWrite = props => {
  const { map } = props;
  const geocoder = new kakao.maps.services.Geocoder();
  const markerRef = React.useRef(null);
  const positionRef = React.useRef(null);
  const dispatch = useDispatch();

  const [preview, setPreview] = React.useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAYFBMVEXDw8MAAABwcHDHx8eKioqkpKS8vLzGxsatra3KysqQkJCenp6AgIB3d3dra2u3t7dZWVlMTEyysrIsLCxTU1NDQ0OUlJQhISEyMjJlZWUMDAw9PT2Dg4N0dHQYGBhGRkaaAXj3AAACVklEQVR4nO3a63KiQBBAYbATxxYQbxtNdjd5/7dMIFwEGbaA1Fo05/tpNFVzZJgBCQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICFEdFJROTRQ5jKxbvVRLF79CCmkW043XbeEeTpBxo8zXs2ZA2i9RSRiQbPUw5l90wDUw2cqIyIYamBHpP9Lho+GEMNNM7P8IfB/8BOg2qbcNaB/8BQg2qt3ww8J5hpkA2kkAwcj50GUdVgN3AymGkQpPW+1zMXfFeHdhror7LBuvt9GsXHzpHaaVAdCC/dw9FddnnYNU0MNXDp4WuUp6j7bCAv3jXDUIPAabo5eia9K46SS9ffDDX44nxbA7kWM2V/f5gYa+CTnwyKVeMuwjIaSL15CMNj+72LaODWt7fNTotsUG8dcq+t2bCEBpq0bqC2dhA2G4ho/cLN1VT3TtJkA00u57R8xQVvdw2ujdlgsYGusnGWEfRwl6B1aWmwQbEQ/v4elf7pSBCGt7cdDTYoF8K/2XftNp0JGqcEew3qhTD7rt27p8FHPRvMNbhZCN/Wge49CcIwqSJYa9BYCD+07yfpxmcsNQgax/6qJ0H4Xn7EWAM99426pfwhwlYDz0LoU1xGm2rgXQh9vu+smWoQXAY2uJhr0LMQ+uR31gw1GPVs1lZMNUj/PeIOqaUGchrV4Cp2GujrqATZZbSVBr274n5bNdJANuOJjQY8ozl6GtRm3sD9yDPb824QuHjqo/ureOYJ8p8TZKJHDwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOB/+wQBph2Iu8J1cQAAAABJRU5ErkJggg=="
  );
  const [image, setImage] = React.useState(null);
  const submitRef = React.useRef({
    titleRef: null,
    categoryRef: null,
    priceRef: null,
    headCountRef: null,
    endTimeRef: null,
    addressRef: null,
    addressDetailRef: null,
    contentRef: null,
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
      // 지번 주소
      const addr = result[0].address;
      submitRef.current.addressRef.value = addr.address_name;
      positionRef.current = { lat, lng };
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
  // todo: 빈 칸 확인 알림 메세지 출력
  // 이미지 빈 칸 확인
  const clickSubmit = () => {
    for (let ref in submitRef.current) {
      if (submitRef.current[ref].value === "") {
        console.log("빈 칸을 확인해주세요");
        return;
      }
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", submitRef.current.titleRef.value);
    formData.append("content", submitRef.current.contentRef.value);
    formData.append("price", submitRef.current.priceRef.value);
    formData.append("headCount", submitRef.current.headCountRef.value);
    formData.append("category", submitRef.current.categoryRef.value);
    formData.append("endTime", submitRef.current.endTimeRef.value);
    formData.append("lat", positionRef.current.lat);
    formData.append("lng", positionRef.current.lng);
    formData.append(
      "address",
      `${submitRef.current.addressRef.value} ${submitRef.current.addressDetailRef.value}`
    );
    dispatch(postActions.addPostDB(formData));
    markerRef.current.setMap(null);
  };

  const setUserImage = e => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  return (
    <Flex
      styles={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        borderRadius: "30px",
        width: "90%",
        height: "90%",
        padding: "25px",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Input label="제목" ref={e => (submitRef.current.titleRef = e)} />
      <Select
        ref={e => (submitRef.current.categoryRef = e)}
        options={[
          { key: "같이 사자", value: "buy" },
          { key: "같이 먹자", value: "eat" },
        ]}
      />
      <Input label="가격" ref={e => (submitRef.current.priceRef = e)} />
      <Input label="인원" ref={e => (submitRef.current.headCountRef = e)} />
      <Input label="기간" ref={e => (submitRef.current.endTimeRef = e)} />
      <Flex styles={{ justifyContent: "space-between" }}>
        <Input
          label="주소"
          ref={e => (submitRef.current.addressRef = e)}
          readOnly
          styles={{ width: "80%" }}
        />
        <Button
          styles={{
            width: "110px",
            height: "30px",
            borderRadius: "30px",
            backgroundColor: "#E6E5F0",
            fontSize: "12px",
          }}
          _onClick={() => setFindState(true)}
        >
          주소가져오기
        </Button>
      </Flex>
      <Input
        label="상세위치"
        ref={e => (submitRef.current.addressDetailRef = e)}
      />
      <Input label="내용" ref={e => (submitRef.current.contentRef = e)} />
      <Flex maxWidth="290px">
        <label htmlFor="profile">
          <Image src={preview} styles={{ width: "100%" }} shape="rectangle" />
        </label>
        <input
          onChange={e => setUserImage(e)}
          id="profile"
          type="file"
          style={{ visibility: "hidden", width: "0" }}
        ></input>
      </Flex>
      <button onClick={clickSubmit}>전송하기</button>
    </Flex>
  );
};

export default PostWrite;
