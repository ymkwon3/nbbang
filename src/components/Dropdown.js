import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Flex, Select, Text } from "../elements";
import "moment/locale/ko";

import { actionCreator as postActions } from "../redux/modules/post";
import { secondaryColor } from "../shared/color";

const Dropdown = () => {
  const dispatch = useDispatch();

  // 임시로 로그인 체크 여기서 했습니다. 나중에 부모 컴포넌트에서 받아올 수 있으면 해야함
  const isLogin = useSelector(state => state.user.isLogin);
  const selectRef = React.useRef(null);
  const options = [
    {
      key: "최신순",
      value: "late",
    },
    {
      key: "임박순",
      value: "due",
    },
  ];
  isLogin && options.push({ key: "찜순", value: "like" });
  const changeEvent = () => {
    const select = selectRef.current.value;
    if (select === "late") dispatch(postActions.updateLastPostList());
    else if (select === "due") dispatch(postActions.updateEndPostList());
    else if (select === "like") dispatch(postActions.updateLikePostList());
  };
  return (
    <Select
      styles={{
        width: "90px",
        height: "30px",
        paddingLeft: "15px",
        outline: "none",
        color: secondaryColor
      }}
      ref={e => (selectRef.current = e)}
      _onChange={changeEvent}
      options={options}
    ></Select>
    // <Flex>
    //     <Button
    //         styles={{
    //             display:"flex",
    //             width: "90px",
    //             height:"29px",
    //             border:"1px solid",
    //             borderRadius:"20px",
    //             padding:"5px 0 0 22px"
    //         }}
    //         _onClick={() => setDrop(category => !category)}
    //     >
    //         <Text styles={{ fontSize:"14px" }}>최신순</Text>
    //         <Icon><AiFillCaretDown className="arrow"/></Icon>
    //     </Button>
    //     {drop ? (
    //         <Flex
    //             styles={{
    //                 flexDirection: "column",
    //                 position: "absolute",
    //                 backgroundColor: "#fff",
    //                 boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    //                 width: "90px",
    //                 height:"70px",
    //                 top: "55px",
    //                 borderRadius:"15px",
    //                 gap:"5px",
    //                 padding:"0 11px 0 0"
    //             }}
    //         >
    //             <Button
    //                 _onClick={() => dispatch(dropdownAction.updateLastPostList())}
    //             >최신순</Button>
    //             <Button
    //                 _onClick={() => dispatch(dropdownAction.updateEndPostList())}
    //             >임박순</Button>
    //             {isLogin ? <Button
    //                 _onClick={() => dispatch(dropdownAction.updateLikePostList())}
    //             >찜</Button> : null}
    //         </Flex>
    //     ) : null}
    // </Flex>
  );
};

export default Dropdown;
