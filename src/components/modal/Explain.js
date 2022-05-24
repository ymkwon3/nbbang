import React from "react";
import { Button, Flex } from "../../elements";
import { Desktop, Mobile } from "../../shared/Responsive";
import {
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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { secondaryColor } from "../../shared/color";

const Explain = props => {
  const { close } = props;
  const [isHost, setIsHost] = React.useState(true);
  const hostList = [host1, host2, host3, host4];
  const partiList = [parti1, parti2, parti3, parti4];
  // slider options
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
          bottom: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  const checkedBtn = {
    width: "250px",
    height: "90px",
    fontSize: "30px",
    fontWeight: "800",
    borderRadius: "20px",
    backgroundColor: secondaryColor,
    color: "#fff",
    filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))",
  }

  const btn = {
    width: "250px",
    height: "90px",
    fontSize: "30px",
    fontWeight: "800",
    borderRadius: "20px",
    backgroundColor: "#fff",
    color: "#000",
    filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))",
  }
  return (
    <Flex
      styles={{
        flexDirection: "column",
        position: "relative",
        width: "80vw",
        height: "80vh",
        maxWidth: "900px",
        maxHeight: "600px",
        backgroundColor: "rgba(255, 255, 255, 1)",
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
        >
          <Flex styles={{ position: "relative", height: "100%" }}>
            <img
              alt="start"
              src={start}
              style={{ width: "100%", height: "100%" }}
            ></img>
            <Flex styles={{ position: "absolute", bottom: "15%", gap: "35px" }}>
              <Button styles={isHost ? checkedBtn : btn} _onClick={() => setIsHost(true)}>방장</Button>
              <Button styles={!isHost ? checkedBtn : btn} _onClick={() => setIsHost(false)}>참가자</Button>
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
              <Button styles={btn} _onClick={close}>좋아!</Button>
            </Flex>
          </Flex>
        </Slider>
      </Desktop>
      <Mobile>explain page22222</Mobile>
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
        transform: "scale(5.0)",
        right: "-80px",
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
        transform: "scale(5.0)",
        left: "-80px",
      }}
      onClick={onClick}
    />
  );
};

export default Explain;
