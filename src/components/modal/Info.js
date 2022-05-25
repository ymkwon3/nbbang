import React from "react";
import { Flex } from "../../elements";
import eventpage1 from "../../image/eventpage/eventpage1.jpg";

const Info = () => {
  return (
    <Flex
      styles={{
        flexDirection: "column",
        position: "relative",
        width: "90vw",
        height: "80vh0",
        maxWidth: "400px",
        maxHeight: "560px",
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: "20px",
      }}
      _onClick={e => e.stopPropagation()}
    >
      <img
        alt="eventbanner"
        src={eventpage1}
        style={{ width: "100%", height: "100%" }}
      ></img>
    </Flex>
  );
};

export default Info;
