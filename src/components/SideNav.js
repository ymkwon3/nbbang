import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator as itemActions } from "../redux/modules/card";

import CardList from "./Card";
import { Flex, Text } from "../elements";
import Pagination from "./Pagination";
import { BiPencil } from "react-icons/bi";
import Dropdown from "react-dropdown";

const SideNav = () => {
  const dispatch = useDispatch();
  const cardList = useSelector(state => state.card.postList);
  // console.log(cardList);
  // postList는 이니셜스테이트값으로 현재 mock data 값을 배열로 가지고 있는중

  //useState 함수를 이용해서 페이지 당 게시물 수 (limit), 현재 페이지 번호(page)를 상태로 추가.
  //그리고 첫 게지물의 위치 (offset) 계산필요
  const [posts, setPosts] = useState([]); // 총 카드의 개수
  const [limit, setLimit] = useState(10); // 한 페이지에 들어갈 카드의 개수
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const offset = (page - 1) * 10; // 첫 게시물의 위치

  useEffect(() => {
    dispatch(itemActions.setCardDB()).then(data => setPosts(data));
  }, []);

  //오버플로우 스크롤 추가

  // const dropdown = [
  //   "one", "two", "three"
  // ]
//드롭다운 추가 해야함

  return (
    <Flex
      styles={{
        width: "430px",
        height: "100%",
        margin:"30px 0 90px",
        flexDirection: "column",
        backgroundColor: "#fff",
        top: 0,
        left: 0,
        zIndex: "10",
        gap: "10px",
        border: "1px solid green",
        justifyContent: "start",
        overflow: "scroll",
      }}
    >
      <Flex styles={{margin:"66px 0 0 40px"}}>
        <Flex>
          <Text styles={{fontSize:"36px", fontWeight:"800"}}>
            같이 사자
          </Text>
        </Flex>
        <Flex styles={{margin:"0 0 0 130px"}}><BiPencil  size="20px"/></Flex>
      </Flex>
      <Flex styles={{ flexDirection: "column" }}>
        {/* 맵으로 카드 돌리기, key값은 unique하게, 배열풀어서 속성으로 넘겨주기 */}

        {/* pagination 적용 전  */}
        {/* {cardList && cardList.map((v, i) => {
            return <CardList key={`card_${i}`} {...v} />
          })} */}

        {/* pagination 적용 후  */}
        {cardList.slice(offset, offset + limit).map((v, i) => (
          <CardList key={`card_${i}`} {...v} />
        ))}
        
      </Flex>
      <Flex styles={{
      width:"430px",
      height:"30px", 
      border:"1px solid blue",
      backgroundColor:"#fff",
      position:"fixed",
      bottom:"0"
      }}>
        <Flex>
          <Pagination
            total={cardList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </Flex>
      </Flex>
    </Flex>
    
  );
};

export default SideNav;
