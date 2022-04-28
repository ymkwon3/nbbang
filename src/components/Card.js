import React from "react";

import { Flex, Image, Text } from "../elements";

const Card = () => {

    return (
        <Flex styles={{width:"376px", height:"141px", border:"1px solid blue"}}>
            <Image styles={{shape:"rectangle"}}/>
            <Flex styles={{flexDirection:"column", alignItems:"flex-start", justifyContent:"flex-start"}}>
                <Text styles={{margin:"0 0 10px 0"}}>제목</Text>
                <Flex styles={{justifyContent:"flex-start"}}>
                    <Text>판매자 : 000</Text>
                    <Text>카테고리</Text>
                </Flex>
                <Flex styles={{justifyContent:"flex-start"}}>
                    <Text>가격 : 00</Text>
                    <Text>날짜 : 4/ 27 ~ 5/1</Text>
                </Flex>
                <Text>서울 양천구 목동로</Text>
            </Flex>
        </Flex>
    )
}

export default Card;