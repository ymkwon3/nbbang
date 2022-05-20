import React from "react";
import { Button, Flex } from "../elements";
import { secondaryColor } from "../shared/color";
const Confirm = (props) => {
  const {_positive, _close, message} = props
  const clickPositive = () => {
    _positive();
    _close();
  }

  const clickNegative = () => {
    _close();
  }
  return (
    <Flex
      styles={{
        flexDirection: "column",
        position: "relative",
        width: "300px",
        height: "140px",
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: "20px",
      }}
      _onClick={e => e.stopPropagation()}
    >
      <Flex
        styles={{
          flex: 1,
          fontFamily: "Cafe24SsurroundAir",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        {message}
      </Flex>
      <Flex
        styles={{
          borderTop: "1px solid #dbdbdb",
          height: "50px",
        }}
      >
        <Button
          styles={{ fontFamily: "Cafe24Ssurround", fontSize: "20px", flex: 1 }}
          _onClick={clickPositive}
        >
          예
        </Button>
        <Flex
          styles={{ width: "1px", height: "100%", backgroundColor: "#dbdbdb" }}
        />
        <Button
          styles={{
            fontFamily: "Cafe24Ssurround",
            fontSize: "20px",
            flex: 1,
            color: secondaryColor,
          }}
          _onClick={clickNegative}
        >
          아니요
        </Button>
      </Flex>
    </Flex>
  );
};

export default Confirm;
