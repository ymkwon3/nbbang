import React from "react";

import { Flex, Image, Text } from "../elements";

const Post = props => {
  const { image, title, writer, category, price, date, address } = props;

  return (
    <Flex
      styles={{
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        borderRadius: "30px",
        padding: "15px",
      }}
    >
      <Image
        styles={{
          width: "110px",
          height: "110px",
          borderRadius: "30px",
          border: "1px solid #dbdbdb",
        }}
        shape="rectangle"
        src={image}
      />
      <Flex
        styles={{
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
          marginLeft: "13px",
        }}
      >
        <Flex styles={{justifyContent: "space-between"}}>
          <Text styles={{ fontSize: "18px", fontWeight: "700" }}>{title}</Text>
          <div>♡</div>
        </Flex>
        <Flex styles={{ justifyContent: "start" }}>
          <Text>{writer}</Text>
          <Text>{category}</Text>
        </Flex>
        <Flex styles={{ justifyContent: "flex-start" }}>
          <Text>{price}</Text>
          <Text>{date}</Text>
        </Flex>
        <Text>{address}</Text>
      </Flex>
    </Flex>
  );
};

export default Post;
