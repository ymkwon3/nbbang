import React from "react";
import styled from "styled-components";
import Flex from "./Flex";
import Text from "./Text";

const Image = (props) => {
  /*
    스타일 사용 가능한 요소들
    width, height, margin, position, display
  */
  const { styles, shape, src, _onClick, className, children, defaultStyles } =
    props;

  if (shape === "circle") {
    return (
      <ImageCircle
        style={{ ...styles }}
        src={src}
        onClick={_onClick}
        className={className}
        {...defaultStyles}
      ></ImageCircle>
    );
  }

  if (shape === "rectangle") {
    return (
      <ImageRectangle
        style={{ ...styles }}
        src={src}
        onClick={_onClick}
        className={className}
        {...defaultStyles}
      ></ImageRectangle>
    );
  }

  // 이미지 안 텍스트 추가하기 위한 컨테이너
  if (shape === "bak") {
    return (
      <ImageContainer>
        <ImageRectangle
          style={{ ...styles }}
          src={src}
          onClick={_onClick}
          className={className}
          {...defaultStyles}
        ></ImageRectangle>
        <Flex styles={{ flexDirection: "column" }}>{children}</Flex>
      </ImageContainer>
    );
  }
};

Image.defaultProps = {
  shape: "circle",
  src: "https://image.ajunews.com/content/image/2020/06/25/20200625140042894225.jpg",
  defaultStyles: { width: "100%", height: "auto" },
};

const ImageRectangle = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  /* object-fit: cover; */
`;

const ImageCircle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
`;

const ImageContainer = styled.div`
  position: relative;

  & > div {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0;
    transition: 0.2s;
  }

  &:hover > div {
    opacity: 0.6;
  }
`;

export default Image;
