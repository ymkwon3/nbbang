import React, { useState } from "react";
import { useSelector } from "react-redux";

import Post from "./Post";
import { Button, Flex, Text } from "../elements";
import Pagination from "./Pagination";
import Dropdown from "./Dropdown";
//style
import styled from "styled-components";
import Permit from "../shared/Permit";
import { write } from "../image";

const SideNav = props => {
  const { _onClickWrite, _onClickDetail, _clickPost, postList, category } =
    props;

  //useState 함수를 이용해서 페이지 당 게시물 수 (limit), 현재 페이지 번호(page)를 상태로 추가.
  //그리고 첫 게지물의 위치 (offset) 계산필요
  const limit = 8; // 한 페이지에 들어갈 카드의 개수
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const offset = (page - 1) * limit; // 첫 게시물의 위치

  const searchPost = useSelector(state => state.post.postSearch);

  const newPostList = postList.filter(v =>
    v.title
      .toString()
      .toLowerCase()
      .includes(searchPost.toString().toLowerCase())
  );

  const clickPost = (postId, lat, lng) => {
    _clickPost(lat, lng);
    _onClickDetail("detail", postId);
  };

  return (
    <Flex
      styles={{
        maxWidth: "430px",
        width: "100%",
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
          flexDirection: "column",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#fff",
          position: "sticky",
          top: "0",
          zIndex: "11",
          padding: "40px 20px 10px",
        }}
      >
        <Flex
          styles={{
            margin: "-17px 0 25px 300px",
          }}
        >
          <Dropdown allList={newPostList} />
        </Flex>
        <Flex styles={{ justifyContent: "space-between" }}>
          <Text
            styles={{ fontSize: "32px", fontWeight: "800", userSelect: "none" }}
          >
            {category === "buy"
              ? "같이 사자"
              : category === "eat"
              ? "같이 먹자"
              : "전체"}
          </Text>
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
            <Post {...v} />
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
