import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../elements/index";
import styled from "styled-components";
import { debounce } from "lodash";

import { actionCreator as searchAction } from "../redux/modules/post";

import { search } from "../image";

export default function SearchBox() {
    const dispatch = useDispatch();

    // const [value, setValue] = 
    const [searchTerm, setSearchTerm] = React.useState("");

    //엔터키 눌렀을때 검색 디스패치
    const show_input = e => {
        if(e.key === "Enter") {
            dispatch(searchAction.searchPost(searchTerm));
        }
    }
    // console.log(searchTerm)

    // const debounceInput = useCallback(
    //     debounce((v) => {
    //         setSearchTerm(v);
    //     }, 500),
    //     []
    // );
    // const handleInputChange = (e) => {
    //     setSearchTerm(e.target.value);
    // }
    

    return (
        <SearchInput>
            <input 
                type="text" 
                placeholder="검색어를 입력해주세요" 
                value={searchTerm} 
                onChange={e => {
                    setSearchTerm(e.target.value);
                }} 
                onKeyPress={show_input}
            />
            <Button _onClick={() => dispatch(searchAction.searchPost(searchTerm))}>
                <img src={search} alt="search" style={{height: "24px"}} />
            </Button>
        </SearchInput>
    );
}
// 인풋에 입력시 온체인지 발생
// handleChange 함수에서 현재 input ㅏㄱㅂㅅ을 이벤트 객체에서 target.value 로 받아온다.
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