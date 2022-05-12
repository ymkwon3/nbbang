import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator as itemActions } from "../redux/modules/post";

import Post from "./Post";
import { Button, Flex, Text } from "../elements";
import Pagination from "./Pagination";
//style
import styled from "styled-components";
import Permit from "../shared/Permit";
import { write } from "../image";

const SideNav = props => {
  const { _onClickWrite, _onClickDetail, _clickPost, postList } = props;
  const dispatch = useDispatch();

  //useState 함수를 이용해서 페이지 당 게시물 수 (limit), 현재 페이지 번호(page)를 상태로 추가.
  //그리고 첫 게지물의 위치 (offset) 계산필요
  const limit = 8; // 한 페이지에 들어갈 카드의 개수
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const offset = (page - 1) * limit; // 첫 게시물의 위치

  const searchPost = useSelector(state => state.post.postSearch);
  //오버플로우 스크롤 추가

  // const dropdown = [
  //   "one", "two", "three"
  // ]
  //드롭다운 추가 해야함

  const newPostList = postList.filter(v =>
    v.title
      .toString()
      .toLowerCase()
      .includes(searchPost.toString().toLowerCase())
  );

  const clickPost = (postId, lat, lng) => {
    _clickPost(lat, lng);
    _onClickDetail(postId)
  }

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
        justifyContent: "start",
        overflow: "scroll",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Flex
        styles={{
          justifyContent: "space-between",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#fff",
          position: "sticky",
          top: "0",
          padding: "40px 20px 10px",
        }}
      >
        <Text styles={{ fontSize: "32px", fontWeight: "800", userSelect: "none" }}>같이 사자</Text>
        <Permit>
          <Button
            styles={{
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
              borderRadius: "50%",
              width: "38px",
              height: "38px",
            }}
            _onClick={_onClickWrite}
          >
            <img src={write} alt="write" />
          </Button>
        </Permit>
      </Flex>
      <Flex
        styles={{
          flexDirection: "column",
          padding: "20px 30px",
          flexGrow: "3",
          justifyContent: "start",
        }}
      >
        {/* 맵으로 카드 돌리기, key값은 unique하게, 배열풀어서 속성으로 넘겨주기 */}

        {/* pagination 적용 후  */}
        {newPostList.slice(offset, offset + limit).map((v, i) => (
          <StyledPost
            onClick={() => clickPost(v.postId, v.lat, v.lng)}
            key={`post_${i}`}
          >
            <Post {...v}/>
          </StyledPost>
        ))}
      </Flex>
      <Flex>
        <Pagination
          total={newPostList.length}
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
  margin: 10px 0;
`;

export default SideNav;
