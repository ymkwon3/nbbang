import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Button, Text } from "../elements/index";
import styled from "styled-components";
import _ from "lodash";

import { actionCreator as searchAction } from "../redux/modules/post";

import { search } from "../image";

export default function SearchBox() {
    const dispatch = useDispatch();
    const postList = useSelector(state => state.post.postList);
    const [searchTerm, setSearchTerm] = React.useState("");
    console.log(searchTerm)
    
    //엔터키 눌렀을때 검색 디스패치
    const show_input = e => {
        if(e.key === "Enter") {
            dispatch(searchAction.searchPost(searchTerm));
        }
    }

    //검색어 디바운스
    const getDebounce = _.debounce((e) => {
        setSearchTerm(e.target.value)
    }, 300);
    
    const filterList = postList.filter(v =>
        v.title
          .replace(" ", "")
          .toString()
          .toLowerCase()
          .includes(searchTerm.replace(" ", "").toString().toLowerCase())
    );
    
    return (
        <Flex>
            <SearchInput>
                <input 
                    type="text" 
                    placeholder="검색어를 입력해주세요" 
                    onChange={getDebounce}
                    onKeyPress={show_input}
                />
                <Button _onClick={() => dispatch(searchAction.searchPost(searchTerm))}>
                    <img src={search} alt="search" style={{height: "24px"}} />
                </Button>
            </SearchInput>
            <Flex
                styles={{
                    flexDirection: "column",
                    position: "absolute",
                    top: "36px",
                    width: "fit-content",
                    borderRadius: "20px",
                    padding: "10px",
                }}
            >
                {searchTerm ?
                    filterList.map((v, i) => (
                    <StyledPost key={`title_${i}`}>
                        <RelatedSearch
                            onClick={() => dispatch(searchAction.searchPost(searchTerm))}
                        >{v.title}</RelatedSearch>  
                    </StyledPost>
                    ))
                : null}
            </Flex>
        </Flex>
    );
}
// 인풋에 입력시 온체인지 발생
// handleChange 함수에서 현재 input 값을 이벤트 객체에서 target.value 로 받아온다.
// 이벤트 객체를 통해서 전달받은 값을 setState를 통해 새로운 input state 값으로 수정.
// onSubmit 함

const SearchInput = styled.div`
  position: relative;
  margin: 0 20px 0 40px;
  & > input {
    width: 350px;
    height: 35px;
    border-radius: 30px;
    padding: 0 40px;
    border: none;
    outline: none;
  }

  & > *:nth-child(2) {
    position: absolute;
    right: 10px;
    top: 6px;
  }
`;

const RelatedSearch = styled.div`
    background-color: #fff;
    width: 340px;
    height: 40px;
    border: 1px solid black;
    border-radius:5px;
    padding: 10px 0 0 15px;
    margin: 0 0 0 20px;
`;

const StyledPost = styled.div`
    width: 100%;
`;