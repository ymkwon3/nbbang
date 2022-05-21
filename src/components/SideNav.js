import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "./Post";
import { actionCreator as postActions } from "../redux/modules/post";
import { Button, Flex, Text } from "../elements";
import Pagination from "./Pagination";
import Dropdown from "./Dropdown";
import Permit from "../shared/Permit";
import { Mobile } from "../shared/Responsive";
//style
import styled from "styled-components";
import { write } from "../image";
import { secondaryColor } from "../shared/color";

const SideNav = props => {
  const { _onClickWrite, _onClickDetail, _clickPost, postList, category } =
    props;
  const dispatch = useDispatch();
  //useState 함수를 이용해서 페이지 당 게시물 수 (limit), 현재 페이지 번호(page)를 상태로 추가.
  //그리고 첫 게지물의 위치 (offset) 계산필요
  const limit = 8; // 한 페이지에 들어갈 카드의 개수
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const offset = (page - 1) * limit; // 첫 게시물의 위치

  const searchPost = useSelector(state => state.post.postSearch);

  //검색창 (수정 빈칸들어가도 검색가능하게 replace로 빈칸제거)
  const newPostList = postList.filter(v =>
    v.title
      .replace(" ", "")
      .toString()
      .toLowerCase()
      .includes(searchPost.replace(" ", "").toString().toLowerCase())
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
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#fff",
          position: "sticky",
          top: "0",
          zIndex: "11",
          padding: "30px 30px 10px",
          maxWidth: "360px",
          width: "100vw",
        }}
      >
        <Flex
          styles={{
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
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
          <Dropdown></Dropdown>
        </Flex>
        <Flex styles={{ justifyContent: "end", minHeight: "38px" }}>
          <Mobile>
            <Flex styles={{ flex: 1, justifyContent: "start", gap: "10px" }}>
              <Button
                styles={{
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "Cafe24SsurroundAir",
                  color: category === "all" ? secondaryColor : "#ababab",
                }}
                _onClick={() => dispatch(postActions.updateCategory("all"))}
              >
                #전체
              </Button>
              <Button
                styles={{
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "Cafe24SsurroundAir",
                  color: category === "buy" ? secondaryColor : "#ababab",
                }}
                _onClick={() => dispatch(postActions.updateCategory("buy"))}
              >
                #같이 사자
              </Button>
              <Button
                styles={{
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "Cafe24SsurroundAir",
                  color: category === "eat" ? secondaryColor : "#ababab",
                }}
                _onClick={() => dispatch(postActions.updateCategory("eat"))}
              >
                #같이 먹자
              </Button>
            </Flex>
          </Mobile>
          <Permit>
            <Button
              styles={{
                boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",
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
          padding: "0px 20px",
          flexGrow: "3",
          justifyContent: "start",
        }}
      >
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
          <Flex styles={{ color: "#626262", width: "360px", fontSize: "18px" }}>
            게시글이 없습니다
          </Flex>
        )}
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
