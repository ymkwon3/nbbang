import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Flex, Text } from "../elements";
import {AiFillCaretDown} from "react-icons/ai";
import "moment/locale/ko";

import { actionCreator as dropdownAction } from '../redux/modules/post';
// import { set } from "immer/dist/internal";

const Dropdown = (props) => {

    const { postList, allList } = props;
    const dispatch = useDispatch();
    const [drop, setDrop] = React.useState(false);

    // const myLike = useSelector(state => state.post.postList)
    // const [like, setLike] = React.useState();

    
    // console.log(like)
    console.log(allList)
    // console.log(myLike)
    // allList.sort((a,b) => a.endTime - b.endTime)
    // console.log(...allList.map(v => moment(endTime).format('L')))


    return (
        <Flex>
            <Button 
                styles={{
                    display:"flex",
                    width: "90px",
                    height:"29px",
                    border:"1px solid",
                    borderRadius:"20px",
                    padding:"5px 0 0 22px"
                }}
                _onClick={() => setDrop(category => !category)}
            >
                <Text styles={{ fontSize:"14px" }}>최신순</Text>
                <Icon><AiFillCaretDown className="arrow"/></Icon>
            </Button>
            {drop ? (
                <Flex
                    styles={{
                        flexDirection: "column",
                        position: "absolute",
                        backgroundColor: "#fff",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                        width: "90px",
                        height:"70px",
                        top: "55px",
                        borderRadius:"15px",
                        gap:"5px",
                        padding:"0 11px 0 0"
                    }}
                >    
                    <Button
                        _onClick={() => dispatch(dropdownAction.updateLastPostList())}
                    >최신순</Button>
                    <Button
                        _onClick={() => dispatch(dropdownAction.updateEndPostList())}
                    >임박순</Button>
                    <Button
                        _onClick={() => dispatch(dropdownAction.updateLikePostList())}
                    >찜</Button>
                </Flex>
            ) : null}
        </Flex>
    )
};
            

const Icon = styled.div`
    margin:3px 0 0 3px
`;

export default Dropdown;