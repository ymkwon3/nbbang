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

const Post = (props) => {
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
    // marginBottom: "10px",
    letterSpacing: "0.5px",
  };

  // number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 3자리마다 콤마찍어주는 정규표현식

  const clickLike = (e) => {
    e.stopPropagation();
    dispatch(postActions.postLikeDB({ postId: postId, isLike: isLike }));
  };

  return (
    <Flex
      styles={{
        padding: "25px 5px",
        height: "180px",
      }}
      className="post-card"
    >
      <Flex
        styles={{
          width: "100px",
          height: "100px",
          borderRadius: "20px",
        }}
      >
        <Image
          styles={{
            width: "100%",
            height: "100%",
            borderRadius: "20px",
            border: "1px solid #dbdbdb",
          }}
          shape="rectangle"
          src={image}
        />
      </Flex>
      {/* <Image
        styles={{
          width: "130px",
          height: "130px",
          borderRadius: "20px",
          border: "1px solid #dbdbdb",
        }}
        shape="rectangle"
        src={image}
      /> */}

      <Flex
        styles={{
          flexDirection: "column",
          justifyContent: "space-between",
          marginLeft: "13px",
          height: "100px",
          width: "141px",
        }}
      >
        <Flex>
          <Text
            className={"line-break"}
            styles={{
              ...contentStyle,
              fontSize: "20px",
              fontWeight: "700",
              // marginBottom: "10px",
            }}
          >
            {title}
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

        {/* <StyledClamp>
          <Text>위치:</Text> {address}
        </StyledClamp> */}
        <Flex
          styles={{
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <Flex>
            <Text styles={contentStyle}>작성자: {writer}</Text>
            {category === "eat" ? (
              <img src={eatCategory} alt="eat" />
            ) : (
              <img
                style={{ width: "25px", height: "25px" }}
                src={buyCategory}
                alt="buy"
              />
            )}
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

      {/* <Flex
        styles={{
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          width: "30px",
          height: "100%",
          gap: "5px",
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
      </Flex> */}
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
