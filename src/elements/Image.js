import React from "react";
import styled from "styled-components";
import Flex from "./Flex";
import Text from "./Text";

const Image = props => {
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

  if (shape === "input") {
    return (
      <ImageInput
        {...styles}
        src={src}
        onClick={_onClick}
        className={className}
        type="file"
      ></ImageInput>
    );
  }

  // 이미지 안 텍스트 추가하기 위한 컨테이너
  if (shape === "post") {
    return (
      <ImageContainer style={{ width: styles.width, height: styles.height }}>
        <ImageRectangle
          style={{ ...styles }}
          src={src}
          onClick={_onClick}
          className={className}
          {...defaultStyles}
        ></ImageRectangle>
        <Flex styles={{ flexDirection: "column", width: styles.width, height: styles.height }}>{children}</Flex>
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
  width: ${props => props.width};
  height: ${props => props.height};
  /* object-fit: cover; */
`;

const ImageCircle = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 50%;
  background-image: url(${props => props.src});
  background-size: cover;
`;

const ImageContainer = styled.div`
  position: relative;
  & > div {
    display: flex;
    align-items: start;
    position: absolute;
    top: 0;
    padding: 20px;
    border-radius: 30px;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: 0.2s;
  }

  &:hover > div {
    opacity: 1;
  }
`;

const ImageInput = styled.input`
  border: 1px solid #d5d5d5;
  background-image: url(${props => props.src});
  background-size: cover;
  &[type="file"]::file-selector-button {
    display: none;
  }
`;

export default Image;
