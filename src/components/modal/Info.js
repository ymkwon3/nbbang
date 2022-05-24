import React from "react";
import { Flex } from "../../elements";

const Info = () => {
  return (
    <Flex
      styles={{
        flexDirection: "column",
        position: "relative",
        width: "90vw",
        height:"80vh",
        maxWidth: "400px",
        maxHeight: "550px",
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: "20px",
      }}
      _onClick={e => e.stopPropagation()}
    >
      백엔드:장문희오경은한재혁
      프론트:권영민곽진호장수찬
      디자이너:김원경이화정
    </Flex>
  );
};

export default Info;
