/* global kakao */
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Flex, Image, Input, Select, Text } from "../../elements";
import { actionCreator as postActions } from "../../redux/modules/post";
import moment from "moment";
import { notify, toast } from "../ToastMessage";

import { addImage } from "../../image";
import { primaryColor, secondaryColor } from "../../shared/color";

const PostWrite = props => {
  const { map, userInfo, _clickContainer, _setRightContainer, _clickFold } =
    props;
  const geocoder = new kakao.maps.services.Geocoder();
  const markerRef = React.useRef(null);
  const positionRef = React.useRef(null);
  const toastRef = React.useRef(null);
  const autoClose = 2000;
  const dispatch = useDispatch();
  const [preview, setPreview] = React.useState(addImage);
  const [image, setImage] = React.useState(null);

  // 유저피드백: 게시물 중복 등록을 방지하기 위한
  const btnRef = React.useRef(null);

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
    _clickFold();
    // 한 번만 클릭 한 후 클릭이벤트 제거
    toast.dismiss(toastRef.current);
    kakao.maps.event.removeListener(map, "click", handler);

    setFindState(false);
  }

  React.useEffect(() => {
    if (findState) {
      // 지도 클릭 이벤트 추가
      kakao.maps.event.addListener(map, "click", handler);
    }
    return () => {
      if (markerRef.current) markerRef.current.setMap(null);
    };
  }, [findState]);

  // 전송하기 버튼 이벤트
  const clickSubmit = () => {
    btnRef.current.disabled = true;
    // 제목 길이 제한 20자
    if (submitRef.current.titleRef.value.length > 20) {
      notify("warning", "제목은 20자 이하로 입력해주세요", autoClose);
      btnRef.current.disabled = false;
      return;
    }
    // 가격, 인원 숫자형식 확인
    if (
      isNaN(submitRef.current.priceRef.value) ||
      isNaN(submitRef.current.headCountRef.value)
    ) {
      notify("warning", "가격, 인원은 숫자만 입력해주세요", autoClose);
      btnRef.current.disabled = false;
      return;
    }
    // 가격 제한 1천만원
    if (submitRef.current.priceRef.value > 10000000) {
      notify("warning", "가격은 천만원 미만으로 설정해주세요", autoClose);
      btnRef.current.disabled = false;
      return;
    }
    // 인원 2명이상 확인
    if (parseInt(submitRef.current.headCountRef.value) < 2) {
      notify("warning", "인원은 2명 이상 설정해주세요", autoClose);
      btnRef.current.disabled = false;
      return;
    }
    // 인원 99명초과 방지
    if (parseInt(submitRef.current.headCountRef.value) > 99) {
      notify("warning", "인원은 99명을 넘을 수 없습니다", autoClose);
      btnRef.current.disabled = false;
      return;
    }
    // 상세주소 제한 30자
    if (submitRef.current.addressDetailRef.value.length > 30) {
      notify("warning", "상세위치는 30자 이하로 입력해주세요", autoClose);
      btnRef.current.disabled = false;
      return;
    }
    // 내용 제한 100자
    if (submitRef.current.contentRef.value.length > 100) {
      notify("warning", "내용은 100자 이하로 입력해주세요", autoClose);
      btnRef.current.disabled = false;
      return;
    }
    // 입력칸 빈칸확인
    for (let ref in submitRef.current) {
      if (submitRef.current[ref].value === "") {
        // 빈 칸 종류 확인이 될까?
        notify("warning", "빈 칸을 확인해주세요", autoClose);
        btnRef.current.disabled = false;
        return;
      }
    }
    if (!image) {
      notify("warning", "사진을 추가해주세요", autoClose);
      btnRef.current.disabled = false;
      return;
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

    // 게시물 작성이 완료되면 게시물 작성 창을 닫습니다.
    dispatch(postActions.addPostDB(formData)).then(res => {
      markerRef.current.setMap(null);
      _clickContainer();
      _setRightContainer("none");
      notify("success", "게시글이 작성되었습니다", autoClose);
    });
  };

  const setUserImage = e => {
    //사진이 변경되었으면 미리보기, 사진 데이터 저장
    if (e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
      notify("success", "사진이 등록되었습니다", 1000);
    }
  };

  return (
    <Flex
      styles={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        borderRadius: "22px",
        width: "90%",
        height: "90%",
        padding: "25px",
        flexDirection: "column",
        overflow: "scroll",
        justifyContent: "start",
      }}
    >
      <Flex styles={{ justifyContent: "space-between" }}>
      <Text styles={{ fontSize: "32px", fontWeight: "800", whiteSpace: "nowrap" }}>모집하기</Text>
        <Text
          styles={{
            fontSize: "32px",
            color: "#bbb",
            lineHeight: "32px",
            cursor: "pointer",
          }}
          _onClick={_clickContainer}
        >
          {"×"}
        </Text>
      </Flex>
      
      <Flex
        styles={{
          color: secondaryColor,
          fontSize: "14px",
          userSelect: "none",
          margin: "15px 0",
          padding: "2px",
          justifyContent: "start",
        }}
      >
        ※ 모든 항목은 필수입니다
      </Flex>
      <Flex
        styles={{
          justifyContent: "start",
          padding: "5px",
          minHeight: "60px",
          borderBottom: "1px solid rgb(0, 0, 0, 0.5)",
        }}
      >
        <Text
          styles={{
            fontSize: "14px",
            fontWeight: "700",
            whiteSpace: "nowrap",
          }}
        >
          카테고리
        </Text>
        <Select
          styles={{
            width: "90px",
            height: "30px",
            marginLeft: "6px",
            fontSize: "14px",
          }}
          title="category"
          ref={e => (submitRef.current.categoryRef = e)}
          options={[
            { key: "같이 사자", value: "buy" },
            { key: "같이 먹자", value: "eat" },
          ]}
        />
      </Flex>
      <Flex
        styles={{
          borderBottom: "1px solid rgb(0, 0, 0, 0.5)",
        }}
      >
        <Input
          label="제목"
          placehorder="20자 이하로 입력해주세요"
          ref={e => (submitRef.current.titleRef = e)}
          styles={{ height: "60px" }}
        />
      </Flex>
      <Flex
        styles={{
          borderBottom: "1px solid rgb(0, 0, 0, 0.5)",
        }}
      >
        <Input
          label="마감일"
          type="date"
          min={moment().add(1, "days").format("YYYY-MM-DD")}
          max={moment().add(14, "days").format("YYYY-MM-DD")}
          ref={e => (submitRef.current.endTimeRef = e)}
          styles={{
            height: "60px",
            overflowX: "scroll",
          }}
        />
      </Flex>
      <Flex
        styles={{
          borderBottom: "1px solid rgb(0, 0, 0, 0.5)",
        }}
      >
        <Input
          label="가격"
          type="number"
          placehorder="ex) 50000"
          ref={e => (submitRef.current.priceRef = e)}
          styles={{ width: "calc(50% - 28px)", height: "60px" }}
        />
        원
        <Flex
          styles={{
            width: "1px",
            height: "80%",
            backgroundColor: "#808080",
            margin: "0 16px 0",
          }}
        />
        <Input
          label="인원"
          type="number"
          placehorder="ex) 5"
          ref={e => (submitRef.current.headCountRef = e)}
          styles={{
            width: "calc(50% - 28px)",
            height: "60px",
            padding: "0 10px 0 0",
          }}
        />
        명
      </Flex>
      <Flex
        styles={{
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
        }}
      >
        <Input
          label="주소"
          ref={e => (submitRef.current.addressRef = e)}
          readOnly
          styles={{ height: "60px" }}
        ></Input>
        <Button
          styles={{
            width: "90px",
            height: "30px",
            borderRadius: "30px",
            backgroundColor: primaryColor,
            fontSize: "10px",
            fontWeight: "600",
          }}
          _onClick={() => {
            setFindState(true);
            _clickFold();
            // 지도 마우스 커서 변경 가능할까???
            toastRef.current = notify(
              "info",
              "모임 장소를 지도에서 선택해주세요!",
              9999999999
            );
          }}
        >
          모임위치
        </Button>
      </Flex>
      <Flex
        styles={{
          borderBottom: "1px solid rgb(0, 0, 0, 0.5)",
        }}
      >
        <Input
          label="상세위치"
          placehorder="30자 이하로 입력해주세요"
          ref={e => (submitRef.current.addressDetailRef = e)}
          styles={{ height: "60px" }}
        />
      </Flex>
      <Flex
        styles={{
          borderBottom: "1px solid rgb(0, 0, 0, 0.5)",
        }}
      >
        <Input
          type="textarea"
          label="내용"
          placehorder="100자 이하로 입력해주세요"
          ref={e => (submitRef.current.contentRef = e)}
          styles={{ height: "90px", margin: "15px 0" }}
        />
      </Flex>
      <Flex
        styles={{
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <Flex
          styles={{
            fontSize: "14px",
            fontWeight: "700",
            minHeight: "60px",
            width: "auto",
            padding: "10px",
          }}
        >
          사진 첨부하기
        </Flex>
        <Flex
          styles={{
            border: "1px solid #eee",
            minHeight: "160px",
          }}
        >
          <label htmlFor="profile" className="hover-event">
            <Image src={preview} styles={{ width: "100%" }} shape="rectangle" />
          </label>
          <input
            onChange={e => setUserImage(e)}
            id="profile"
            type="file"
            style={{ visibility: "hidden", width: "0" }}
          ></input>
        </Flex>
      </Flex>

      <Button
        styles={{
          width: "150px",
          minHeight: "40px",
          backgroundColor: secondaryColor,
          color: "#fff",
          borderRadius: "30px",
          fontSize: "18px",
          fontWeight: "700",
          marginTop: "20px",
        }}
        _onClick={clickSubmit}
        ref={btnRef}
      >
        등록하기
      </Button>
    </Flex>
  );
};

export default PostWrite;
