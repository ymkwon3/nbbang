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

const GridDiv = styled.div`
  display: grid;
  justify-items: center;
  gap: 15px;
  grid-template-columns: repeat(3, minmax(30%, 1fr));

  @media (max-width: 1022px)  {
    grid-template-columns: repeat(2, minmax(40%, 1fr))!important;
  }
  @media (max-width: 500px)  {
    grid-template-columns: repeat(1, minmax(90%, 1fr))!important;
  }
`;

export default Grid;
