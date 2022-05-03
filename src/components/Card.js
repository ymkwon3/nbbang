import React from "react";

import { Flex, Image, Text } from "../elements";

const CardList = props => {

    const item = props;
    //여기 props 선언 안해주면 왜 안될까용?
    return (
        <Flex styles={{width:"376px", height:"141px", border:"1px solid blue", margin:"5px"}}>
            
            <Image styles={{shape:"rectangle"}} defaultStyles={{width:"100px", height:"100px"}} src={props.imgUrl}/>
            <Flex styles={{flexDirection:"column", alignItems:"flex-start", justifyContent:"flex-start"}}>
                <Text styles={{margin:"0 0 10px 0"}}>{props.title}</Text>
                <Flex styles={{justifyContent:"flex-start"}}>
                    <Text>{props.userName}</Text>
                    <Text>{props.category}</Text>
                </Flex>
                <Flex styles={{justifyContent:"flex-start"}}>
                    <Text>{props.price}</Text>
                    <Text>{props.date}</Text>
                </Flex>
                <Text>{props.address}</Text> 
            </Flex>
        </Flex>
    )
}

export default CardList;
