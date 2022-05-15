import React from "react";
import styled from "styled-components";
import Text from "./Text";

const InputLogin = React.forwardRef((props, ref) => {
  /*
    스타일 사용 가능한 요소들
    width, height, margin, position, display, backgroundColor
  */

  // input 태그에 className 추가
  const { styles, padding, type, label, subText, value, readOnly, _onChange, defaultStyles, className } = props;
  
  return (
    <InputContainer style={{...styles}} padding={padding} {...defaultStyles}>
      <input
        ref={ref}
        type={type}
        placeholder=" "
        autoComplete="off"
        value={value}
        readOnly={readOnly}
        onChange={_onChange}
        className={className}
      />
      <label>{label}</label>
      <Text styles={{fontSize: "12px"}}>
        {subText}
      </Text>
    </InputContainer>
  );
});

InputLogin.defaultProps = {
  defaultStyles: {
    fontSize: "14px",
    border: "2px solid #eee",
    padding: "15px",
  },
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 360px;

  & > input {
    font-size: ${props => props.fontSize};
    width: 100%;
    padding: ${props => props.padding};
    outline: none;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    background-color: transparent;
    height: 50px;
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
  & > input:not(:placeholder-shown) {
    border: 2px solid #19253D;
    outline: 2px solid #19253D;
  }

  & > input:focus + label,
  & > input:not(:placeholder-shown) + label {
    transform: translateY(-${props => props.padding}) translateY(-50%);
    color: #19253D;
    font-weight: bold;
  }

  /* & > input::-ms-reveal {
    filter: invert();
  } */

  & > span {
    margin-top: 5px;
    color: #ff5040;
  }
`;

export default InputLogin;
