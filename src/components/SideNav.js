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
        position: "relative",
        backgroundColor: "#fff",
        zIndex: "10",
        gap: "10px",
        border: "1px solid green",
        opacity: 0.9
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
