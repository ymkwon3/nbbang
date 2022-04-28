import React from "react";

import Card from "./Card";

import { Flex } from "../elements";

const SideNav = () => {

    return (
        <Flex styles={{
            width:"430px", 
            flexDirection:"column", 
            justifyContent:"left",
            gap:"10px", 
            border:"1px solid green"
        }}>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </Flex>
    )
}

export default SideNav;