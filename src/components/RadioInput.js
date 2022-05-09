import React from "react";
import { Button, Flex } from "../elements";
const RadioInput = props => {
  const { city, setCityRange } = props;

  const buttonStyles = {
    width: "50px",
    height: "50px",
    backgroundColor: "transparent",
    borderRadius: "0",
    fontSize: "20px",
    fontWeight: "600",
  };

  const checkHandler = id => {
    setCityRange(id);
  };

  return (
    <Flex
      styles={{
        flexDirection: "column",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        backgroundColor: "#fff",
        borderRadius: "10px",
      }}
    >
      {city === 3 ? (
        <>
          <Button styles={buttonStyles} _onClick={() => checkHandler(1)}>
            시
          </Button>
          <Button
            styles={{
              ...buttonStyles,
              borderTop: "1px solid rgba(0, 0, 0, 0.5)",
              borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
            }}
            _onClick={() => checkHandler(2)}
          >
            구
          </Button>
          <Button styles={buttonStyles} _onClick={() => checkHandler(3)}>
            동
          </Button>
        </>
      ) : (
        <>
          <Button styles={buttonStyles} _onClick={() => checkHandler(2)}>
            시
          </Button>
          <Button
            styles={{
              ...buttonStyles,
              borderTop: "1px solid rgba(0, 0, 0, 0.5)",
            }}
            _onClick={() => checkHandler(3)}
          >
            동
          </Button>
        </>
      )}
    </Flex>
  );
};

export default RadioInput;
