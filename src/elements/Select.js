import React, { forwardRef } from "react";
import styled from "styled-components";

const Select = forwardRef((props, ref) => {
  /*
    스타일 사용 가능한 요소들
    fontSize, fontWeight, color, margin, padding, lineHeight, overflow
  */
  const { styles, options, _onChange, className, defaultStyles } = props;

  return (
    <SelectStyled
      style={{ ...styles }}
      className={className}
      {...defaultStyles}
      ref={ref}
      onChange={_onChange}
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
    height: "30px",
  },
};

const SelectStyled = styled.select`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  color: ${props => props.color};
  width: ${props => props.width};
  height: ${props => props.height};
  padding: 5px;
  border-radius: 20px;
  border: none;
  outline: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

export default Select;
