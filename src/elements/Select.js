import React, { forwardRef } from "react";
import styled from "styled-components";

const Select = forwardRef((props, ref) => {
  /*
    스타일 사용 가능한 요소들
    fontSize, fontWeight, color, margin, padding, lineHeight, overflow
  */
  const { styles, options, className, defaultStyles } = props;

  return (
    <SelectStyled
      style={{ ...styles }}
      className={className}
      {...defaultStyles}
      ref={ref}
    >
      {options.map(o => (
        <option key={o.key} value={o.value}>
          {o.key}
        </option>
      ))}
    </SelectStyled>
  );
});

Select.defaultProps = {
  defaultStyles: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#000",
    width: "100%",
    borderBottom: "1px solid #333",
  },
};

const SelectStyled = styled.select`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  color: ${props => props.color};
  width: ${props => props.width};
  border-bottom: ${props => props.borderBottom};
`;

export default Select;
