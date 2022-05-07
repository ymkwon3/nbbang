import React from "react";
import styled from "styled-components";
import { Flex } from "../elements";
const RadioInput = props => {
  const {city, setCityRange} = props;
  const checkHandler = id => {
    setCityRange(id);
  };
  return (
    <Flex styles={{ flexDirection: "column" }}>
      {city === 3 ? (
        <>
          <StyledButton onClick={() => checkHandler(1)}>시</StyledButton>
          <StyledButton onClick={() => checkHandler(2)}>구</StyledButton>
          <StyledButton onClick={() => checkHandler(3)}>동</StyledButton>
        </>
      ) : (
        <>
          <StyledButton onClick={() => checkHandler(2)}>시</StyledButton>
          <StyledButton onClick={() => checkHandler(3)}>동</StyledButton>
        </>
      )}
    </Flex>
  );
};

const StyledButton = styled.button`
  width: 35px;
  height: 35px;
`;

export default RadioInput;
