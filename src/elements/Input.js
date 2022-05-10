import React, { forwardRef } from "react";
import styled from "styled-components";

const Input = forwardRef((props, ref) => {
  /*
    스타일 사용 가능한 요소들
    fontSize, fontWeight, color, margin, padding, lineHeight, overflow
  */
  const { styles, label, className, defaultStyles, readOnly, children } = props;

  return (
    <InputStyled style={{ ...styles }} className={className} {...defaultStyles}>
      <label>{label}</label>
      <input readOnly={readOnly} ref={ref}></input>
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
  height: 60px;
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
  width: ${props => props.width};
  padding: 10px;
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
  }
`;

export default Input;
