import React from "react";
import styled from "styled-components";
import Text from "./Text";

const InputLogin = React.forwardRef((props, ref) => {
  /*
    스타일 사용 가능한 요소들
    width, height, margin, position, display, backgroundColor
  */
  const { styles, padding, type, label, subText, value, _onChange, defaultStyles } = props;

  return (
    <InputContainer {...styles} padding={padding} {...defaultStyles}>
      <input
        ref={ref}
        type={type}
        placeholder=" "
        autoComplete="off"
        value={value}
        onChange={_onChange}
      />
      <label>{label}</label>
      <Text fontSize="12px" display={subText ? null : "none"}>
        {subText}
      </Text>
    </InputContainer>
  );
});

InputLogin.defaultProps = {
  defaultStyles: {
    fontSize: "14px",
    border: "2px solid #eee",
    padding: "20px",
  },
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 300px;

  & > input {
    font-size: ${props => props.fontSize};
    width: 100%;
    padding: ${props => props.padding};
    outline: none;
    border: 2px solid #eee;
    border-radius: 8px;
    background-color: transparent;
    color: ${props => props.color};
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
    color: ${props => props.color};
  }

  & > input:focus,
  & > input:not(:placeholder-shown) {
    border: 2px solid #35a0b8;
    outline: 2px solid #35a0b8;
  }

  & > input:focus + label,
  & > input:not(:placeholder-shown) + label {
    transform: translateY(-${props => props.padding}) translateY(-50%)
      translateX(-${props => props.padding}) scale(0.8);
    color: #35a0b8;
    font-weight: bold;
  }

  /* & > input::-ms-reveal {
    filter: invert();
  } */

  & > div {
    margin-top: 10px;
    color: #ff5040;
  }
`;

export default InputLogin;
