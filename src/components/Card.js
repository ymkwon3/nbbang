import React from "react";

import { Flex, Image, Text } from "../elements";

const CardList = props => {

    const item = props;
    //여기 props 선언 안해주면 왜 안될까용?
    return (
        <Flex styles={{width:"376px", height:"141px", border:"1px solid blue", margin:"5px", borderRadius:"30px", boxShadow:"2px 2px 5px grey"}}>
            
            <Image shape={"rectangle"} styles={{margin:"15px", borderRadius:"25px"}} defaultStyles={{width:"115px", height:"112px"}} src={props.imgUrl}/>
            <Flex styles={{height:"141px", gap:"6px", margin:" 0 0 5px 0", flexDirection:"column", alignItems:"flex-start"}}>
                <Text styles={{fontSize:"20px", fontWeight:"700"}}>{props.title}</Text>
                <Flex styles={{justifyContent:"space-between"}}>
                    <Text>{props.userName}</Text>
                    <Text styles={{margin:"0 30px 0 0"}}>{props.category}</Text>
                </Flex>
                <Flex styles={{justifyContent:"space-between"}}>
                    <Text>{props.price}</Text>
                    <Text styles={{margin:"0 88px 0 0"}}>{props.date}</Text>
                </Flex>
                <Text>{props.address}</Text> 
            </Flex>
        </Flex>
    )
}

export default CardList;
