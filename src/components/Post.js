import React from "react";
import moment from "moment";
import "moment/locale/ko";

import { useDispatch } from "react-redux";
import { actionCreator as postActions } from "../redux/modules/post";
import { Flex, Image, Text } from "../elements";
import Permit from "../shared/Permit";
import { Desktop } from "../shared/Responsive";

//style
import styled from "styled-components";
import {
  filledHeart,
  emptyHeart,
  eatCategory,
  buyCategory,
  priceGray,
  calendarGray,
  addressGray,
} from "../image";

const Post = props => {
  const {
    image,
    title,
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
  const isDesktop = Desktop(0);
  // number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 3자리마다 콤마찍어주는 정규표현식

  const clickLike = e => {
    e.stopPropagation();
    dispatch(postActions.postLikeDB({ postId: postId, isLike: isLike }));
  };

  return (
    <Flex
      styles={{
        padding: isDesktop === undefined ? "30px 0px" : "20px 0px",
        height: isDesktop === undefined ? "180px" : "160px",
      }}
      className="hover-event"
    >
      <Flex
        styles={{
          width: "120px",
          height: "120px",
          minWidth: "120px",
          minHeight: "120px",
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
          justifyContent: "start",
          marginLeft: "13px",
          maxWidth: "180px",
          width: "60%",
          minWidth: "100px",
          maxHeight: "180px",
          minheight: "100px",
          height: "100%",
          flex: "1",
        }}
      >
        <Flex styles={{ justifyContent: "space-between", 
              marginBottom: "10px", }}>
          <Text
            className={"line-break"}
            styles={{
              ...contentStyle,
              fontSize: "18px",
              fontWeight: "700",
              width: "85%",
              fontFamily: "Cafe24SsurroundAir",
            }}
          >
            {title}
          </Text>
          <Flex
            styles={{
              width: "25px",
              height: "25px",
              flexDirection: "column",
              justifyContent: "start",
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

        <Flex styles={{
          marginBottom: "15px",
        }}>
          <img alt="price" src={priceGray} style={{ marginRight: "5px" }}></img>
          <Text styles={contentStyle}>
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </Text>
        </Flex>
        <Flex styles={{
          marginBottom: "15px",
        }}>
          <img
            alt="calendar"
            src={calendarGray}
            style={{ marginRight: "5px" }}
          ></img>
          <Text styles={contentStyle}>{moment(endTime).format("MM-DD")} 까지</Text>
        </Flex>

        <StyledClamp>
          <Flex>
            <img
              alt="address"
              src={addressGray}
              style={{ marginRight: "5px" }}
            ></img>
            <Text styles={contentStyle}>{address}</Text>
          </Flex>
        </StyledClamp>
      </Flex>
    </Flex>
  );
};

const StyledClamp = styled.div`
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 13px;
 
`;

export default Post;
