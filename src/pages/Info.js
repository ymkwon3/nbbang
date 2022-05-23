import React from "react";
import { Flex } from "../elements";

const Info = props => {
  
  return (
    <Flex
    styles={{
      flexDirection: "column",
      position: "relative",
      width: "400px",
      height: "600px",
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderRadius: "20px",
    }}
    _onClick={e => e.stopPropagation()}
  >
   
  </Flex>
  );
};

export default Info;