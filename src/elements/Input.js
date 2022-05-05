import React, { forwardRef } from "react";
import styled from "styled-components";

const Input = forwardRef((props, ref) => {
  /*
    스타일 사용 가능한 요소들
    fontSize, fontWeight, color, margin, padding, lineHeight, overflow
  */
  const { styles, label, className, defaultStyles, readOnly } = props;

  return (
    <InputStyled style={{ ...styles }} className={className} {...defaultStyles}>
      <label>{label} :</label>
      <input readOnly={readOnly} ref={ref}></input>
    </InputStyled>
  );
});

Input.defaultProps = {
  defaultStyles: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#000",
    width: "100%",
    // borderBottom: "1px solid #333",
  },
};

const InputStyled = styled.div`
  display: flex;
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  color: ${props => props.color};
  width: ${props => props.width};
  border-bottom: ${props => props.borderBottom};
  & > input {
    flex: 1;
    border: none;
    outline: none;
    padding: 5px;
    line-height: 18px;
  }

  & > label {
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};
  }
`;

export default Input;
