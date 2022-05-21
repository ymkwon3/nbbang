import React from "react";
import { Flex } from "../elements";
import styled from "styled-components";
import { waffle, croissant, baguette, redBean } from "../image/bread";
import { Desktop } from "../shared/Responsive";
const Loading = (props) => {
  const { children } = props;
  const breadList = [waffle, croissant, baguette, redBean]
  const index = Math.floor(Math.random() * 4);
  const isDesktop = Desktop(0);
  return (
    <Flex
      styles={{
        flexDirection: "column",
        width: isDesktop === undefined ? "300px" : "200px",
        height: isDesktop === undefined ? "200px" : "160px",
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: "20px",
        gap: "10px",
        padding: isDesktop === undefined ? "20px 40px" : "20px 18px"
      }}
    >
      <Animation>
        <img alt="character" src={breadList[index]}></img>
      </Animation>
      {children}
    </Flex>
  );
};

const Animation = styled.div`
  & img {
    animation: scale 0.5s linear infinite;
  }

  @keyframes scale {
    0% {
      transform: scale(1.0) rotate(0);
    }
    50% {
      transform: scale(0.95) rotate(5deg);
    }
    100% {
      transform : scale(1.0) rotate(0);
    }
  }
`;

// const Spinner = styled.div`
//   width: 50px;
//   height: 50px;
//   background-size: 50px;
//   background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' style='margin: auto; background: none; display: block; shape-rendering: auto;' width='200px' height='200px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'%3E%3Cg transform='rotate(0 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.9166666666666666s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(30 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.8333333333333334s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(60 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.75s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(90 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.6666666666666666s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(120 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.5833333333333334s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(150 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.5s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(180 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.4166666666666667s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(210 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.3333333333333333s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(240 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.25s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(270 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.16666666666666666s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(300 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.08333333333333333s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(330 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='0s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3C/svg%3E");
// `;

export default Loading;
