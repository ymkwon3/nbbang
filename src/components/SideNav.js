import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator as itemActions } from "../redux/modules/card";

import Post from "./Post";
import { Flex, Text } from "../elements";
import Pagination from "./Pagination";
//style
import styled from "styled-components";
import Permit from "../shared/Permit";


const SideNav = props => {
  const { _onClickWrite, _onClickDetail, postList } = props;
  const dispatch = useDispatch();
  // const cardList = useSelector(state => state.card.postList);
  // console.log(cardList);
  // postList는 이니셜스테이트값으로 현재 mock data 값을 배열로 가지고 있는중

  //useState 함수를 이용해서 페이지 당 게시물 수 (limit), 현재 페이지 번호(page)를 상태로 추가.
  //그리고 첫 게지물의 위치 (offset) 계산필요
  const [posts, setPosts] = useState([]); // 총 카드의 개수
  const [limit, setLimit] = useState(10); // 한 페이지에 들어갈 카드의 개수
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const offset = (page - 1) * 10; // 첫 게시물의 위치

  // useEffect(() => {
  //   dispatch(itemActions.setCardDB()).then(data => setPosts(data));
  // }, []);

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
        flexDirection: "column",
        backgroundColor: "#fff",
        top: 0,
        left: 0,
        zIndex: "10",
        gap: "10px",
        padding: "30px",
        justifyContent: "start",
        overflow: "scroll",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)"
      }}
    >
      <Flex styles={{ justifyContent: "space-between" }}>
        <Text styles={{ fontSize: "32px", fontWeight: "800" }}>같이 사자</Text>
        <Permit><button onClick={_onClickWrite}>글쓰기</button></Permit>
      </Flex>
      <Flex styles={{ flexDirection: "column" }}>
        {/* 맵으로 카드 돌리기, key값은 unique하게, 배열풀어서 속성으로 넘겨주기 */}

        {/* pagination 적용 전  */}
        {/* {cardList && cardList.map((v, i) => {
            return <CardList key={`card_${i}`} {...v} />
          })} */}

        {postList.map((v, i) => (
          <StyledPost onClick={_onClickDetail} key={`card_${i}`}>
            <Post {...v} />
          </StyledPost>
        ))}

        {/* pagination 적용 후  */}
        {/* {postList.slice(offset, offset + limit).map((v, i) => (
          <div onClick={_onClickDetail} key={`card_${i}`}>
            <CardList {...v} _onClick={_onClickDetail} />
          </div>
        ))} */}
      </Flex>
      <Flex>
        <Pagination
          total={postList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </Flex>
    </Flex>
    
  );
};

const StyledPost = styled.div`
  width: 100%;
  margin: 5px 0;
`;

export default SideNav;
