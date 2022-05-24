import React from "react";
import { Flex } from "../../elements";
import { Desktop, Mobile } from "../../shared/Responsive";
import {} from "../../image/explain/web"

const Explain = () => {
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
      <Desktop>explain page11111</Desktop>
      <Mobile>explain page22222</Mobile>
    </Flex>
  );
};

export default Explain;
