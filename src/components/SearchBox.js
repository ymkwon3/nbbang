import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Button } from "../elements/index";
import styled from "styled-components";
import _ from "lodash";

import { actionCreator as searchAction } from "../redux/modules/post";

import { search } from "../image";

export default function SearchBox() {
  const dispatch = useDispatch();
  const postList = useSelector(state => state.post.postList);
  // 검색어
  const searchRef = React.useRef(null);
  // 필터링되는 게시물 리스트
  const [filterList, setFilterList] = React.useState(null);
  // 현재 검색중인지 아닌지 판단
  const [searching, setSearching] = React.useState(false);
  //엔터키 눌렀을때 검색 디스패치
  const show_input = e => {
    if (e.key === "Enter") {
      clickSearch();
    }
  };

  //검색어 디바운스
  const getDebounce = _.debounce(e => {
    if (searchRef.current.value === "") {
      setSearching(false);
      return;
    }
    if (!searching) setSearching(true);
    setFilterList(
      postList.filter(
        function (v) {
          if (
            this.count < 5 &&
            v.title
              .replace(" ", "")
              .toString()
              .toLowerCase()
              .includes(
                searchRef.current.value
                  .replace(" ", "")
                  .toString()
                  .toLowerCase()
              )
          ) {
            this.count++;
            return true;
          }
          return false;
        },
        { count: 0 }
      )
    );
  }, 300);

  // 검색
  const clickSearch = () => {
    dispatch(searchAction.searchPost(searchRef.current.value));
    setSearching(false);
  };

  return (
    <Flex
      styles={{
        flexDirection: "column",
        position: "relative",
        maxWidth: "350px",
        width: "40vw",
      }}
    >
      <SearchInput>
        <input
          ref={searchRef}
          type="text"
          placeholder="검색어를 입력해주세요"
          onChange={getDebounce}
          onKeyUp={show_input}
        />
        <Button _onClick={clickSearch}>
          <img src={search} alt="search" style={{ height: "24px" }} />
        </Button>
      </SearchInput>

      {searching ? (
        <StyledPost>
          {filterList?.map((v, i) => (
            <Flex
              key={`title_${i}`}
              styles={{
                height: "40px",
                justifyContent: "start",
                paddingLeft: "10px",
              }}
              _onClick={() => {
                searchRef.current.value = v.title;
                clickSearch();
              }}
            >
              {v.title}
            </Flex>
          ))}
        </StyledPost>
      ) : null}
    </Flex>
  );
}
// 인풋에 입력시 온체인지 발생
// handleChange 함수에서 현재 input 값을 이벤트 객체에서 target.value 로 받아온다.
// 이벤트 객체를 통해서 전달받은 값을 setState를 통해 새로운 input state 값으로 수정.
// onSubmit 함

const SearchInput = styled.div`
  position: relative;
  width: 100%;
  & > input {
    width: 100%;
    height: 35px;
    border-radius: 30px;
    padding: 0 40px 0 20px;
    border: none;
    outline: none;
  }

  & > *:nth-child(2) {
    position: absolute;
    right: 10px;
    top: 6px;
  }
`;

const StyledPost = styled.div`
  position: absolute;
  max-width: 350px;
  min-width: 200px;
  width: 100%;
  background-color: #fff;
  top: 40px;
  left: 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;
