import React from "react";
import { Button, Flex } from "../../elements";
import { Desktop, Mobile } from "../../shared/Responsive";
import {
  intro,
  start,
  end,
  host1,
  host2,
  host3,
  host4,
  parti1,
  parti2,
  parti3,
  parti4,
} from "../../image/explain/web";
import {
  mintro,
  mstart,
  mend,
  mhost1,
  mhost2,
  mhost3,
  mhost4,
  mparti1,
  mparti2,
  mparti3,
  mparti4,
} from "../../image/explain/mobile";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { secondaryColor } from "../../shared/color";

const Explain = props => {
  const { close } = props;
  const [isHost, setIsHost] = React.useState(true);
  const hostList = [host1, host2, host3, host4];
  const partiList = [parti1, parti2, parti3, parti4];

  const sliderRef = React.useRef(null);

  // for mobile use
  const mhostList = [mhost1, mhost2, mhost3, mhost4];
  const mpartiList = [mparti1, mparti2, mparti3, mparti4];
  const isDesktop = Desktop(0);

  // slider options
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow isDesktop={isDesktop} />,
    prevArrow: <PrevArrow isDesktop={isDesktop} />,
    appendDots: dots => (
      <div
        style={{
          display: "absolute",
          borderRadius: "10px",
          padding: "10px",
          bottom: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  // for web use
  const checkedBtn = {
    width: "250px",
    height: "90px",
    fontSize: "30px",
    fontWeight: "800",
    borderRadius: "20px",
    backgroundColor: secondaryColor,
    color: "#fff",
    filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))",
  };

  // for web use
  const btn = {
    width: "250px",
    height: "90px",
    fontSize: "30px",
    fontWeight: "800",
    borderRadius: "20px",
    backgroundColor: "#fff",
    color: "#000",
    filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))",
  };

  // for mobile use
  const mcheckedBtn = {
    width: "calc(100%*152/400)",
    maxWidth: "152px",
    height: "54px",
    fontSize: "20px",
    fontWeight: "800",
    borderRadius: "10px",
    backgroundColor: secondaryColor,
    color: "#fff",
    filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))",
  };

  // for mobile use
  const mbtn = {
    width: "calc(100%*152/400)",
    maxWidth: "152px",
    height: "54px",
    fontSize: "20px",
    fontWeight: "800",
    borderRadius: "10px",
    backgroundColor: "#fff",
    color: "#000",
    filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))",
  };

  return (
    <Flex
      styles={{
        flexDirection: "column",
        position: "relative",
        width: "80vw",
        height: isDesktop === undefined ? "80vh" : "auto",
        aspectRatio: isDesktop === undefined ? "auto" : "400 / 550",
        maxWidth: isDesktop === undefined ? "900px" : "400px",
        maxHeight: isDesktop === undefined ? "600px" : "550px",
        backgroundColor: "transparent",
        borderRadius: "20px",
      }}
      _onClick={e => e.stopPropagation()}
    >
      <Desktop>
        <Slider
          {...settings}
          style={{
            width: "100%",
            height: "100%",
          }}
          ref={sliderRef}
        >
          <Flex styles={{ position: "relative", height: "100%" }}>
            <img
              alt="intro"
              src={intro}
              style={{ width: "100%", height: "100%" }}
            ></img>
            <Flex styles={{ position: "absolute", bottom: "10%" }}>
              <Button
                styles={{
                  width: "240px",
                  height: "60px",
                  borderRadius: "30px",
                  border: "2px solid #fff",
                  backgroundColor: "transparent",
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#fff",
                }}
                _onClick={() => {
                  sliderRef.current.slickNext();
                }}
              >
                지금 참여하러 가기!
              </Button>
            </Flex>
          </Flex>
          <Flex styles={{ position: "relative", height: "100%" }}>
            <img
              alt="start"
              src={start}
              style={{ width: "100%", height: "100%" }}
            ></img>
            <Flex styles={{ position: "absolute", bottom: "15%", gap: "35px" }}>
              <Button
                styles={isHost ? checkedBtn : btn}
                _onClick={() => {
                  setIsHost(true);
                  sliderRef.current.slickNext();
                }}
              >
                방장
              </Button>
              <Button
                styles={!isHost ? checkedBtn : btn}
                _onClick={() => {
                  setIsHost(false);
                  sliderRef.current.slickNext();
                }}
              >
                참가자
              </Button>
            </Flex>
          </Flex>
          {isHost
            ? hostList.map((v, i) => (
                <img
                  key={`host${i}`}
                  alt={`host${i}`}
                  src={v}
                  style={{ width: "100%", height: "100%" }}
                ></img>
              ))
            : partiList.map((v, i) => (
                <img
                  key={`parti${i}`}
                  alt={`parti${i}`}
                  src={v}
                  style={{ width: "100%", height: "100%" }}
                ></img>
              ))}
          <Flex styles={{ position: "relative", height: "100%" }}>
            <img
              alt="end"
              src={end}
              style={{ width: "100%", height: "100%" }}
            ></img>
            <Flex styles={{ position: "absolute", bottom: "15%" }}>
              <Button styles={btn} _onClick={close}>
                좋아!
              </Button>
            </Flex>
          </Flex>
        </Slider>
      </Desktop>
      <Mobile>
        <Slider
          {...settings}
          style={{
            width: "100%",
            height: "100%",
          }}
          ref={sliderRef}
        >
          <Flex
            styles={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <img
              src={mintro}
              alt="mintro"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            <Flex
              styles={{
                position: "absolute",
                bottom: "15%",
                gap: "calc(100%*21/400)",
              }}
            >
              <Button
                styles={{width: "180px",
                height: "40px",
                borderRadius: "30px",
                border: "2px solid #fff",
                backgroundColor: "transparent",
                fontSize: "18px",
                fontWeight: "600",
                color: "#fff",}}
                _onClick={() => {
                  sliderRef.current.slickNext();
                }}
              >
                지금 참여하러 가기!
              </Button>
            </Flex>
          </Flex>
          <Flex
            styles={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <img
              src={mstart}
              alt="mstart"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            <Flex
              styles={{
                position: "absolute",
                bottom: "15%",
                gap: "calc(100%*21/400)",
              }}
            >
              <Button
                styles={isHost ? mcheckedBtn : mbtn}
                _onClick={() => {
                  setIsHost(true);
                  sliderRef.current.slickNext();
                }}
              >
                방장
              </Button>
              <Button
                styles={!isHost ? mcheckedBtn : mbtn}
                _onClick={() => {
                  setIsHost(false);
                  sliderRef.current.slickNext();
                }}
              >
                참가자
              </Button>
            </Flex>
          </Flex>
          {isHost
            ? mhostList.map((v, i) => (
                <img
                  key={`mhost${i}`}
                  alt={`mhost${i}`}
                  src={v}
                  style={{ width: "100%", height: "100%" }}
                ></img>
              ))
            : mpartiList.map((v, i) => (
                <img
                  key={`mparti${i}`}
                  alt={`mparti${i}`}
                  src={v}
                  style={{ width: "100%", height: "100%" }}
                ></img>
              ))}
          <Flex
            styles={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={mend}
              alt="mend"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            <Flex styles={{ position: "absolute", bottom: "15%" }}>
              <Button styles={mbtn} _onClick={close}>
                좋아!
              </Button>
            </Flex>
          </Flex>
        </Slider>
      </Mobile>
    </Flex>
  );
};

const NextArrow = props => {
  const { className, style, onClick, isDesktop } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        transform: isDesktop === undefined ? "scale(3.0)" : "scale(2.0)",
        right: isDesktop === undefined ? "-50px" : "-30px",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = props => {
  const { className, style, onClick, isDesktop } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        transform: isDesktop === undefined ? "scale(3.0)" : "scale(2.0)",
        left: isDesktop === undefined ? "-50px" : "-30px",
      }}
      onClick={onClick}
    />
  );
};

export default Explain;
