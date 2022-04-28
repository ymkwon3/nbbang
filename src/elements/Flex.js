import React from "react";
import styled from "styled-components";

const Flex = props => {
  /*
    스타일 사용 가능한 요소들
    color, width, height, margin, padding, border, borderBottom, borderBottom, borderRadius
    gap, position, top, bottom, left, right, flexDirection, justifyContent, alignItems
    backgroundColor, zIndex, overflow, minWidth, minHeight, maxWidth, maxHeight, aspectRatio
    flexWrap, boxShadow
  */
  const { styles, children, className, _onClick, defaultStyles } = props;
  return (
    <FlexDiv onClick={_onClick} style={{ ...styles }} className={className} {...defaultStyles}>
      {children}
    </FlexDiv>
  );
};

Flex.defaultProps = {
  defaultStyles: {width: "100%", jc: "center", ai: "center"},
};

const FlexDiv = styled.div`
  display: flex;
  justify-content: ${props => props.jc};
  align-items: ${props => props.ai};
  width: ${props => props.width};
  border: ${props => props.border};
`;

export default Flex;
