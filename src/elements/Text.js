import React from "react";
import styled from "styled-components";

const Text = props => {
  /*
    스타일 사용 가능한 요소들
    fontSize, fontWeight, color, margin, padding, lineHeight, overflow
  */
  const { styles, children, className, _onClick, defaultStyles } = props;

  return (
    <TextStyled style={{ ...styles }} onClick={_onClick} className={className} {...defaultStyles}>
      {children}
    </TextStyled>
  );
};

Text.defaultProps = {
  defaultStyles: { fontSize: "14px", fontWeight: "400", color: "#000" },
};

const TextStyled = styled.span`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  color: ${props => props.color};
`;

export default Text;
