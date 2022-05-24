import React from "react";
import { Flex } from "../elements";

const Explain = props => {
  return (
    <Flex
      styles={{
        flexDirection: "column",
        position: "relative",
        width: "80vw",
        height: "80vh",
        maxWidth: "900px",
        maxHeight: "600px",
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: "20px",
      }}
      _onClick={e => e.stopPropagation()}
    >
      explain page
    </Flex>
  );
};

export default Explain;
