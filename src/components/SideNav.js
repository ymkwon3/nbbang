import React, { useState,useEffect } from "react";

import CardList from "./Card";

import { Flex, Text } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as itemActions } from "../redux/modules/card";

const SideNav = () => {

  const dispatch = useDispatch();
  const cardList = useSelector((state) => state.card.postList);

  // console.log(cardList);

  useEffect(() => {
        dispatch(itemActions.setCardDB());
    
  },[]
  );

  // const

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
      <Text>같이 사자</Text>
      <Flex styles={{flexDirection:"column"}}>
          {/* 맵으로 카드 돌리기, key값은 unique하게, 배열풀어서 속성으로 넘겨주기 */}
          {cardList && cardList.map((v, i) => {
            return <CardList key={`card_${i}`} {...v} />
          })}
      </Flex>
    </Flex>
  );
};

export default SideNav;
