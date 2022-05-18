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
import { secondaryColor } from "../shared/color";

const SideNav = (props) => {
  const { _onClickWrite, _onClickDetail, _clickPost, postList, category } =
    props;
  //useState 함수를 이용해서 페이지 당 게시물 수 (limit), 현재 페이지 번호(page)를 상태로 추가.
  //그리고 첫 게지물의 위치 (offset) 계산필요
  const limit = 8; // 한 페이지에 들어갈 카드의 개수
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const offset = (page - 1) * limit; // 첫 게시물의 위치

  const searchPost = useSelector((state) => state.post.postSearch);

  const newPostList = postList.filter((v) =>
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
        maxWidth: "360px",
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
          // boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#fff",
          position: "sticky",
          top: "0",
          zIndex: "11",
          padding: "30px 30px 10px",
        }}
      >
        <Flex
          styles={{
            justifyContent: "end",
            marginBottom: "20px",
          }}
        >
          <Dropdown></Dropdown>
        </Flex>
        <Flex styles={{ justifyContent: "space-between" }}>
          {category === "buy" ? (
            <Text
              styles={{
                fontSize: "36px",
                fontWeight: "700",
                userSelect: "none",
                fontFamily: "Cafe24Ssurround",
              }}
            >
              같이{" "}
              <Text
                styles={{
                  fontSize: "36px",
                  fontWeight: "700",
                  userSelect: "none",
                  color: secondaryColor,
                  fontFamily: "Cafe24Ssurround",
                }}
              >
                사자
              </Text>
            </Text>
          ) : category === "eat" ? (
            <Text
              styles={{
                fontSize: "36px",
                fontWeight: "700",
                userSelect: "none",
                fontFamily: "Cafe24Ssurround",
              }}
            >
              같이{" "}
              <Text
                styles={{
                  fontSize: "36px",
                  fontWeight: "700",
                  userSelect: "none",
                  color: secondaryColor,
                  fontFamily: "Cafe24Ssurround",
                }}
              >
                먹자
              </Text>
            </Text>
          ) : (
            <Text
              styles={{
                fontSize: "36px",
                fontWeight: "700",
                userSelect: "none",
                fontFamily: "Cafe24Ssurround",
              }}
            >
              전체
            </Text>
          )}

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
          padding: "0px 15px",
          flexGrow: "3",
          justifyContent: "start",
        }}
      >
        <div style={{ borderTop: "1px solid rgba(0, 0, 0, .1)" }}>
          {/* pagination 적용 후  */}
          {newPostList.length !== 0 ? (
            newPostList.slice(offset, offset + limit).map((v, i) => (
              <StyledPost
                onClick={() => clickPost(v.postId, v.lat, v.lng)}
                key={`post_${i}`}
              >
                <Post {...v} />
              </StyledPost>
            ))
          ) : (
            <Flex
              styles={{ color: "#626262", width: "370px", fontSize: "18px" }}
            >
              게시글이 없습니다
            </Flex>
          )}
        </div>
      </Flex>
      {newPostList.length === 0 ? null : (
        <Flex>
          <Pagination
            total={newPostList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </Flex>
      )}
    </Flex>
  );
};

const StyledPost = styled.div`
  width: 100%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;

export default SideNav;
