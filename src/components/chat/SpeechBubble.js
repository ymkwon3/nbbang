import React, { forwardRef } from "react";
import styled from "styled-components";

const SpeechBubble = forwardRef((props, ref) => {
  return (
    <Bubble ref={ref} style={{ fontFamily: "Pretendard" }}>
      유저를 추가하려면 오른쪽 사람 모양을 클릭해주세요.
    </Bubble>
  );
});

const Bubble = styled.div`
  position: absolute;
  background: #dfd3ca;
  opacity: 0.8;
  border-radius: 0.4em;
  right: 10px;
  top: -34px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  transition: tranform 0.5s ease-in-out;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: #dfd3ca;
    border-bottom: 0;
    border-right: 0;
    margin-left: -10px;
    margin-bottom: -20px;
  }
`;

export default SpeechBubble;
