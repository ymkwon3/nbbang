import React from "react";

import Card from "./Card";

import { Flex } from "../elements";

const SideNav = () => {
  return (
    <Flex
      styles={{
        width: "430px",
        height: "100%",
        flexDirection: "column",
        justifyContent: "left",
        position: "absolute",
        backgroundColor: "#fff",
        top: 0,
        left: 0,
        zIndex: "10",
        gap: "10px",
        border: "1px solid green",
      }}
    >
      <Card />
      <Card />
      <Card />
      <Card />
    </Flex>
  );
};

export default SideNav;
