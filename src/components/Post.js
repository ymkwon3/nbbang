import React from "react";
import moment from "moment";
import "moment/locale/ko";

import { useDispatch } from "react-redux";
import { actionCreator as postActions } from "../redux/modules/post";
import { Flex, Image, Text } from "../elements";
import Permit from "../shared/Permit";

//style
import styled from "styled-components";
import { filledHeart, emptyHeart, eatCategory, buyCategory } from "../image";

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
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: "3px",
    letterSpacing: "0.5px",
  };

  // number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 3자리마다 콤마찍어주는 정규표현식

  const clickLike = e => {
    e.stopPropagation();
    dispatch(postActions.postLikeDB({ postId: postId, isLike: isLike }));
  };

  return (
    <Flex
      styles={{
        height: "140px",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        borderRadius: "30px",
        padding: "15px",
      }}
      className="post-card"
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
          width: "calc(100% - 123px)",
        }}
      >
        <Text
          className={"line-break"}
          styles={{
            ...contentStyle,
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          {title}
        </Text>

        <Text styles={contentStyle}>
          <Text>가격:</Text>{" "}
          {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </Text>
        <Text styles={contentStyle}>
          <Text>마감일:</Text> {moment(endTime).format("MM-DD")}
        </Text>
        <StyledClamp>
          <Text>위치:</Text> {address}
        </StyledClamp>
      </Flex>
      <Flex
        styles={{
          flexDirection: "column",
          justifyContent: "start",
          width: "30px",
          height: "100%",
          gap: "5px"
        }}
      >
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
        {category === "eat" ? (
          <img src={eatCategory} alt="eat" />
        ) : (
          <img src={buyCategory} alt="buy" />
        )}
      </Flex>
    </Flex>
  );
};

const StyledClamp = styled.p`
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 12px;
`;

export default Post;
