import React, { forwardRef } from "react";
import styled from "styled-components";

const Input = forwardRef((props, ref) => {
  /*
    스타일 사용 가능한 요소들
    fontSize, fontWeight, color, margin, padding, lineHeight, overflow
  */
  const {
    styles,
    type,
    label,
    className,
    defaultStyles,
    readOnly,
    children,
    placehorder,
    min,
    max,
  } = props;

  // 요청으로 인한 textarea 추가 type에 textarea주시면 됩니다
  // type date형식 추가
  return (
    <InputStyled style={{ ...styles }} className={className} {...defaultStyles}>
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea
          style={{
            resize: "none",
            width: "80%",
            boxShadow: "rgb(0 0 0 / 20%) 0px 0px 2px",
            border: "none",
            outline: "none",
            padding: "5px",
            marginLeft: "15px",
            textDecoration: "none",
          }}
          placeholder={placehorder}
          ref={ref}
        ></textarea>
      ) : type === "date" ? (
        <input
          ref={ref}
          type={type}
          min={min}
          max={max}
          style={{
            backgroundColor: "#fff",
          }}
        ></input>
      ) : (
        <input
          placeholder={placehorder}
          readOnly={readOnly}
          ref={ref}
          onKeyPress={e => {
            // type이 number일 경우 숫자만 입력받게 -- 한글은 onkeypress적용이 안돼서 전송할 때 따로 한번 확인해줘야할듯
            // 모바일에서도 안먹히는 이슈가 있음
            if (type === "number") {
              return !/[0-9]/.test(e.key) && e.preventDefault();
            }
          }}
        ></input>
      )}
      {children}
    </InputStyled>
  );
});

Input.defaultProps = {
  defaultStyles: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#000",
    width: "100%",
  },
};

const InputStyled = styled.div`
  display: flex;
  position: relative;
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
  width: ${props => props.width};
  padding: 5px;
  & > input {
    flex: 1;
    border: none;
    outline: none;
    padding-left: 10px;
    line-height: 18px;
    width: 100%;
    text-decoration: none;
  }

  & > label {
    display: flex;
    align-items: center;
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};
    white-space: nowrap;
  }
`;

export default Input;
