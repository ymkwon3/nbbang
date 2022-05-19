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
    endTime,
    address,
    postId,
    isLike,
  } = props;
  const dispatch = useDispatch();
  //span tag에 text-overflow를 주기 위함
  const contentStyle = {
    display: "block",
    fontSize: "13px",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
        padding: "30px 0px",
        height: "180px",
      }}
      className="hover-event"
    >
      <Flex
        styles={{
          maxWidth: "120px",
          maxHeight: "120px",
          minWidth: "100px",
          minHeight: "100px",
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Image
          styles={{
            width: "100%",
            height: "100%",
            border: "1px solid #dbdbdb",
          }}
          shape="square"
          src={image}
        />
      </Flex>

      <Flex
        styles={{
          flexDirection: "column",
          justifyContent: "space-between",
          marginLeft: "13px",
          width: "50%",
          maxHeight: "180px",
          minheight: "100px",
          height: "100%",
          flex: "1",
        }}
      >
        <Flex styles={{ justifyContent: "space-between" }}>
          <Text
            className={"line-break"}
            styles={{
              ...contentStyle,
              fontSize: "20px",
              fontWeight: "700",
              width: "85%"
            }}
          >
            {title}
          </Text>
          <Flex styles={{ width: "25px", height: "25px"}}>
            {category === "eat" ? (
              <img
                style={{ width: "100%", height: "100%" }}
                src={eatCategory}
                alt="eat"
              />
            ) : (
              <img
                style={{ width: "100%", height: "100%" }}
                src={buyCategory}
                alt="buy"
              />
            )}
          </Flex>
        </Flex>
        <Flex
          styles={{
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <Flex styles={{ justifyContent: "space-between" }}>
            <Text styles={{ ...contentStyle, width: "auto" }}>
              작성자: {writer}
            </Text>
            
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
            <Text>마감일:</Text> {moment(endTime).format("MM-DD")}
          </Text>
          <StyledClamp>
            <Text>위치:</Text> {address.slice(0, 10) + ".."}
          </StyledClamp>
        </Flex>
      </Flex>
    </Flex>
  );
};

const StyledClamp = styled.div`
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 13px;
`;

export default Post;
