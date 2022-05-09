import React from "react";
import styled from "styled-components";

const Grid = props => {
  /*
    스타일 사용 가능한 요소들
    color, width, height, margin, padding, border, borderBottom, borderBottom, borderRadius
    gap, position, top, bottom, left, right
    backgroundColor, zIndex, overflow, minWidth, minHeight, maxWidth, maxHeight
    boxShadow
  */
  const { styles, children, className, _onClick, defaultStyles } = props;
  return (
    <GridDiv onClick={_onClick} style={{ ...styles }} className={className} {...defaultStyles}>
      {children}
    </GridDiv>
  );
};

Grid.defaultProps = {
  defaultStyles: {width: "100%"},
};

const GridDiv = styled.div`
  display: grid;
  justify-items: center;
  width: ${props => props.width};
  gap: 30px;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
`;

export default Grid;
