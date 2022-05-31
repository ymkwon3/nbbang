import React from "react";
import styled from "styled-components";
import Text from "./Text";

import { primaryColor, primaryDarked } from "../shared/color";

const InputLogin = React.forwardRef((props, ref) => {
  /*
    스타일 사용 가능한 요소들
    width, height, margin, position, display, backgroundColor
  */

  // input 태그에 className 추가
  const {
    styles,
    padding,
    type,
    label,
    subText,
    value,
    readOnly,
    _onChange,
    _onKeyUp,
    defaultStyles,
    className,
    textarea,
  } = props;

  return (
    <InputContainer padding={padding} {...defaultStyles} {...styles}>
      {textarea ? (
        <textarea
          ref={ref}
          type={type}
          placeholder=" "
          autoComplete="off"
          value={value}
          readOnly={readOnly}
          onChange={_onChange}
          className={className}
          onKeyUp={_onKeyUp}
        ></textarea>
      ) : (
        <input
          ref={ref}
          type={type}
          placeholder=" "
          autoComplete="off"
          value={value}
          readOnly={readOnly}
          onChange={_onChange}
          className={className}
          onKeyUp={_onKeyUp}
        />
      )}

      <label>{label}</label>
      <Text styles={{ fontSize: "12px" }}>{subText}</Text>
    </InputContainer>
  );
});

InputLogin.defaultProps = {
  defaultStyles: {
    fontSize: "14px",
    border: "2px solid #eee",
    outline: "none",
    padding: "15px",
    borderRadius: "10px",
    height: "50px",
  },
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 90%;
  max-width: 360px;
  margin-bottom: ${props => props.marginBottom};

  & > input , & > textarea {
    font-size: ${props => props.fontSize};
    width: 100%;
    padding: ${props => props.padding};
    outline: ${props => props.outline};
    border: ${props => props.border};
    border-radius: ${props => props.borderRadius};
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    background-color: transparent;
    height: ${props => props.height};
    resize: none;
  }

  & > label {
    font-size: ${props => props.fontSize};
    position: absolute;
    z-index: 1;
    background-color: #fff;
    left: ${props => props.padding};
    top: ${props => props.padding};
    transition: 0.2s;
    user-select: none;
  }

  & > input:focus,
  & > input:not(:placeholder-shown),
  & > textarea:focus,
  & > textarea:not(:placeholder-shown) {
    border: 2px solid ${primaryColor};
    outline: 2px solid ${primaryColor};
  }

  & > input:focus + label,
  & > input:not(:placeholder-shown) + label,
  & > textarea:focus + label,
  & > textarea:not(:placeholder-shown) + label {
    transform: translateY(-${props => props.padding}) translateY(-50%);
    color: ${primaryDarked};
    font-weight: bold;
  }

  /* & > input::-ms-reveal {
    filter: invert();
  } */

  & > span {
    position: absolute;
    bottom: -20px;
    color: #ff5040;
  }
`;

export default InputLogin;
