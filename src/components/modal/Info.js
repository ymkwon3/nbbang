import React from "react";
import { Flex, Text } from "../../elements";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import eventpage1 from "../../image/eventpage/eventpage1.jpg";
import { secondaryColor } from "../../shared/color";
const Info = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div
        style={{
          display: "absolute",
          borderRadius: "10px",
          padding: "10px",
          bottom: "0",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <Flex
      styles={{
        flexDirection: "column",
        position: "relative",
        width: "90vw",
        maxWidth: "400px",
        maxHeight: "550px",
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: "20px",
        overflow: "hidden",
      }}
      _onClick={e => e.stopPropagation()}
    >
      <Slider
        {...settings}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Flex styles={{ borderRadius: "20px", position: "relative" }}>
          <img
            alt="eventbanner"
            src={eventpage1}
            style={{ width: "100%", height: "100%" }}
          ></img>
          <button
            style={{
              position: "absolute",
              width: "100px",
              height: "100px",
              right: "30px",
              bottom: "30px",
              border: "none",
              backgroundColor: "transparent"
            }}
            onClick={() => window.open("https://forms.gle/jD5mWW3gQaRLDUvR6", "_blank")}
          ></button>
        </Flex>

        <Flex
          styles={{
            flexDirection: "column",
            height: "100%",
            alignItems: "start",
            padding: "20px",
            gap: "40px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {/* <img
            alt="logo"
            src={logo}
            style={{
              width: "40px",
              height: "40px",
            }}
          ></img> */}
          <Text
            styles={{
              color: secondaryColor,
              fontSize: "22px",
              fontWeight: "900",
            }}
          >
            ABOUT
          </Text>
          <Flex
            styles={{
              flexDirection: "column",
              alignItems: "start",
              gap: "5px",
            }}
          >
            <Text
              styles={{
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              Service
            </Text>
            <Text styles={{ fontSize: "16px", fontWeight: "400" }}>
              서비스 이름 : <span style={{ fontWeight: "200" }}>N빵</span>
            </Text>
            <Text styles={{ fontSize: "16px", fontWeight: "400" }}>
              서비스 버전 : <span style={{ fontWeight: "200" }}>v1.0.0</span>
            </Text>
            <Text styles={{ fontSize: "16px", fontWeight: "400" }}>
              오류신고 및 문의 :{" "}
              <span style={{ fontWeight: "200" }}>nbbang2022@gmail.com</span>
            </Text>
          </Flex>

          <Flex
            styles={{
              flexDirection: "column",
              alignItems: "start",
              gap: "5px",
            }}
          >
            <Text
              styles={{
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              Team
            </Text>
            <Text styles={{ fontSize: "16px", fontWeight: "400" }}>
              백엔드 :{" "}
              <span style={{ fontWeight: "200" }}>장문희, 오경은, 한재혁</span>
            </Text>
            <Text styles={{ fontSize: "16px", fontWeight: "400" }}>
              프론트엔드 :{" "}
              <span style={{ fontWeight: "200" }}>권영민, 곽진호, 장수찬</span>
            </Text>
            <Text styles={{ fontSize: "16px", fontWeight: "400" }}>
              디자이너 :{" "}
              <span style={{ fontWeight: "200" }}>김원경, 이화정</span>
            </Text>
          </Flex>

          <Flex
            styles={{
              flexDirection: "column",
              alignItems: "start",
              gap: "5px",
            }}
          >
            <Text
              styles={{
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              Project
            </Text>
            <Text styles={{ fontSize: "16px", fontWeight: "400" }}>
              백엔드 :{" "}
              <span
                style={{ fontWeight: "200" }}
                onClick={() => {
                  window.open(
                    "https://github.com/moonhjang/09Project_BE",
                    "_blank"
                  );
                }}
              >
                https://github.com/moonhjang/...
              </span>
            </Text>
            <Text styles={{ fontSize: "16px", fontWeight: "400" }}>
              프론트엔드 :{" "}
              <span
                style={{ fontWeight: "200" }}
                onClick={() => {
                  window.open("https://github.com/ymkwon3/nbbang", "_blank");
                }}
              >
                https://github.com/ymkwon3/...
              </span>
            </Text>
          </Flex>
        </Flex>
      </Slider>
    </Flex>
  );
};

const NextArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        transform: "scale(2.0)",
        right: "10px",
        zIndex: 15,
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        transform: "scale(2.0)",
        left: "10px",
        zIndex: 15,
      }}
      onClick={onClick}
    />
  );
};

export default Info;
