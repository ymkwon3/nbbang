import React from "react";
import moment from "moment";
import "moment/locale/ko";

import { useDispatch } from "react-redux";
import { actionCreator as postActions } from "../redux/modules/post";
import { Flex, Image, Text } from "../elements";
import Permit from "../shared/Permit";

//style
import filledHeart from "../image/filledHeart.svg";
import emptyHeart from "../image/emptyHeart.svg";

const Post = props => {
  const {
    image,
    title,
    writer,
    category,
    price,
    createdAt,
    endTime,
    address,
    postId,
    isLike,
  } = props;
  const dispatch = useDispatch();
  //span tag에 text-overflow를 주기 위함
  const contentStyle = {
    display: "block",
    fontSize: "12px",
    width: "50%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  // number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 3자리마다 콤마찍어주는 정규표현식

  const clickLike = e => {
    e.stopPropagation();
    dispatch(postActions.postLikeDB({ postId: postId, isLike: isLike }));
  };

  return (
    <Flex
      styles={{
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        borderRadius: "30px",
        padding: "15px",
      }}
    >
      <Image
        styles={{
          width: "110px",
          height: "110px",
          borderRadius: "30px",
          border: "1px solid #dbdbdb",
        }}
        shape="rectangle"
        src={image}
      />
      <Flex
        styles={{
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
          marginLeft: "13px",
          height: "110px",
          width: "calc(100% - 123px)"
        }}
      >
        <Flex
          styles={{ justifyContent: "space-between", marginBottom: "13px" }}
        >
          <Text className={"line-break"} styles={{ fontSize: "18px", fontWeight: "700"}}>{title}</Text>
          <Permit>
            {isLike ? (
              <img
                alt="filledHeart"
                src={filledHeart}
                className="hover-event"
                onClick={clickLike}
              ></img>
            ) : (
              <img
                alt="filledHeart"
                src={emptyHeart}
                className="hover-event"
                onClick={clickLike}
              ></img>
            )}
          </Permit>
        </Flex>
        <Text styles={contentStyle}>
            <Text>가격:</Text>{" "}
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </Text>
          <Text styles={contentStyle}>
            <Text>마감일:</Text>{" "}
            {moment(endTime).format("MM-DD")}
          </Text>
          <Text styles={{ fontSize: "12px" }}>
            <Text>위치:</Text> {address}
          </Text>
        {/* <Flex styles={{ justifyContent: "start" }}>
          <Text styles={contentStyle}>
            <Text styles={{ fontWeight: "600" }}>작성자:</Text> {writer}
          </Text>
          <Text styles={contentStyle}>
            <Text styles={{ fontWeight: "600" }}>카테고리:</Text>{" "}
            {category === "eat" ? "먹자" : "사자"}
          </Text>
        </Flex> */}
        {/* <Flex styles={{ justifyContent: "start" }}>
          <Text styles={contentStyle}>
            <Text styles={{ fontWeight: "600" }}>가격:</Text>{" "}
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </Text>
          <Text styles={contentStyle}>
            <Text styles={{ fontWeight: "600" }}>마감일:</Text>{" "}
            {moment(endTime).format("MM-DD")}
          </Text>
        </Flex> */}
        {/* <Flex styles={{ justifyContent: "start" }}>
          <Text styles={{ fontSize: "12px" }}>
            <Text styles={{ fontWeight: "600" }}>위치:</Text> {address}
          </Text>
        </Flex> */}
      </Flex>
    </Flex>
  );
};

export default Post;
