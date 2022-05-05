import React from "react";
import styled from "styled-components";

const Button = props => {
  /*
    스타일 사용 가능한 요소들
    width, height, margin, padding, border, borderRadius, position
    backgroundColor, 
  */

  const { styles, _disabled, _onClick, children, className, defaultStyles } =
    props;

  return (
    <ButtonStyle
      className={className}
      style={{ ...styles }}
      onClick={_onClick}
      disabled={_disabled}
      {...defaultStyles}
    >
      {children}
    </ButtonStyle>
  );
};

Button.defaultProps = {
  defaultStyles: {
    bg: "#fff",
    width: "",
    height: "",
    border: "none",
    borderRadius: "4px",
  },
  _disabled: false,
};

const ButtonStyle = styled.button`
  background-color: ${props => props.bg};
  width: ${props => props.width};
  height: ${props => props.height};
  border: ${props => props.border};
  border-radius: ${props => props.borderRadius};
  cursor: pointer;
  transition: 0.2s;
  &:active {
    opacity: 1;
  }

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.3;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    height: 100%;
    background-color: yellow;
  }

  &:current {
    background-color: #cdd5ec;
  }
`;

export default Button;
