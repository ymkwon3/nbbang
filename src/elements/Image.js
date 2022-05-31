import React from "react";
import styled from "styled-components";
import Flex from "./Flex";
import { croissant } from "../image/bread";

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

  if (shape === "square") {
    return (
      <ImageWrapper
        style={{ ...styles }}
        onClick={_onClick}
        className={className}
        {...defaultStyles}
      >
        <img alt={src} src={src}></img>
      </ImageWrapper>
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
      <ImageContainer
        style={{
          width: styles.width,
          height: styles.height,
          maxWidth: styles.maxWidth,
          maxHeight: styles.maxHeight,
          border: styles.border,
        }}
        onClick={_onClick}
        className="hover-event"
      >
        <img alt={src} src={src}></img>
        {children ? (
          <Flex
            styles={{
              width: styles.width,
              height: "30%",
              maxWidth: styles.maxWidth,
              maxHeight: styles.maxHeight,
            }}
          >
            {children}
          </Flex>
        ) : null}
      </ImageContainer>
    );
  }
};

Image.defaultProps = {
  shape: "circle",
  src: croissant,
  defaultStyles: { width: "100%" },
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

const ImageWrapper = styled.div`
  position: relative;

  & img {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
    transition: 0.1s;
  }

  & img:hover {
    transform: scale(1.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;

  & img {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
    transition: 0.1s;
  }

  & > div {
    display: flex;
    position: absolute;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    transition: 0.2s;
    opacity: 1;
    color: #fff;
    font-family: "Cafe24SsurroundAir";
    font-size: 20px;
    font-weight: 600;
  }

  & > div > * > * {
    color: #fff;
    font-family: "Cafe24SsurroundAir";
    font-size: 20px;
    font-weight: 600;
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
