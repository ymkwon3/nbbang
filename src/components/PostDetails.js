import React from "react";

// style
import styled from "styled-components";

// elements
import { Button, Flex, Grid, Image, Text } from "../elements";

// react icons
import { GrLocation } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { MdOutlinePriceChange, MdContentPaste } from "react-icons/md";
import { GiAlarmClock } from "react-icons/gi";

const PostDetails = props => {
  return (
    <Flex
      styles={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 4px 6px 2px rgba(0, 0, 0, 0.25)",
        borderRadius: "30px",
        width: "90%",
        height: "90%",
        padding: "25px",
        flexDirection: "column",
      }}
    >
      {/* 상세페이지  */}
      <PostWriterInfo />
      <PostDetailsContents />
      <PostChattingBox />
    </Flex>
  );
};

export default PostDetails;

const PostWriterInfo = props => {
  return (
    <>
      <Flex>
        <Flex defaultStyles={{ width: "100%", jc: "flex-start", ai: "center" }}>
          <Flex
            styles={{ height: "29px" }}
            defaultStyles={{ width: "29px", jc: "center", ai: "center" }}
          >
            <Image
              shape="circle"
              defaultStyles={{ width: "100%", height: "100%" }}
            />
          </Flex>
          <Flex defaultStyles={{ width: "auto", jc: "center", ai: "center" }}>
            <Text
              styles={{ lineHeight: "22px", margin: "0 0 0 7px" }}
              defaultStyles={{
                fontSize: "18px",
                fontWeight: "400",
                color: "#000",
              }}
            >
              프로필
            </Text>
          </Flex>
        </Flex>
        <Flex
          styles={{ height: "29px", border: "1px solid #000000" }}
          defaultStyles={{ width: "70px", jc: "center", ai: "center" }}
        >
          <Text
            styles={{ lineHeight: "22px" }}
            defaultStyles={{
              fontSize: "18px",
              fontWeight: "400",
              color: "#000",
            }}
          >
            1/5
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

const PostDetailsContents = props => {
  return (
    <>
      <Flex styles={{ marginTop: "17px", flexDirection: "column" }}>
        {/* Title */}
        <Flex defaultStyles={{ width: "100%", jc: "flex-start", ai: "center" }}>
          <Text
            styles={{ lineHeight: "43px" }}
            defaultStyles={{
              fontSize: "2.25rem",
              fontWeight: "800",
              color: "#000",
            }}
          >
            제목
          </Text>
        </Flex>

        {/* Body */}
        <Flex styles={{ flexDirection: "column", margin: "25px 0 0 0" }}>
          {/* 주소 */}
          <Flex
            styles={{ padding: "3px 0px" }}
            defaultStyles={{ width: "100%", jc: "flex-start", ai: "center" }}
          >
            <GrLocation
              style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
            />

            <Text
              styles={{ marginLeft: "1rem" }}
              defaultStyles={{
                fontSize: "0.95rem",
                fontWeight: "400",
                color: "#000",
              }}
            >
              서울 강서구 마곡중앙6로 93 1층 109, 110호
            </Text>
          </Flex>
          {/* 카테고리 */}
          <Flex
            styles={{ padding: "3px 0px" }}
            defaultStyles={{ width: "100%", jc: "flex-start", ai: "center" }}
          >
            <BiCategory
              style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
            />

            <Text
              styles={{ marginLeft: "1rem" }}
              defaultStyles={{
                fontSize: "0.95rem",
                fontWeight: "400",
                color: "#000",
              }}
            >
              건강
            </Text>
          </Flex>
          {/* 가격 */}
          <Flex
            styles={{ padding: "3px 0px" }}
            defaultStyles={{ width: "100%", jc: "flex-start", ai: "center" }}
          >
            <MdOutlinePriceChange
              style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
            />

            <Text
              styles={{ marginLeft: "1rem" }}
              defaultStyles={{
                fontSize: "0.95rem",
                fontWeight: "400",
                color: "#000",
              }}
            >
              ₩ 1,000,000
            </Text>
          </Flex>
          {/* 기한 */}
          <Flex
            styles={{ padding: "3px 0px" }}
            defaultStyles={{ width: "100%", jc: "flex-start", ai: "center" }}
          >
            <GiAlarmClock
              style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
            />

            <Text
              styles={{ marginLeft: "1rem" }}
              defaultStyles={{
                fontSize: "0.95rem",
                fontWeight: "400",
                color: "#000",
              }}
            >
              2022-12-25 12:15 pm 까지
            </Text>
          </Flex>
          {/* 내용 */}
          <Flex styles={{ flexDirection: "column" }}>
            <Flex
              styles={{ padding: "3px 0px" }}
              defaultStyles={{ width: "100%", jc: "flex-start", ai: "center" }}
            >
              <MdContentPaste
                style={{ fontSize: "1.5rem", fontWeight: "400", color: "#000" }}
              />

              <Text
                styles={{ marginLeft: "1rem" }}
                defaultStyles={{
                  fontSize: "0.95rem",
                  fontWeight: "400",
                  color: "#000",
                }}
              >
                내용
              </Text>
            </Flex>
            <Flex
              className="removeScroll"
              styles={{
                height: "100px",
                // border: "1px solid #000000",
                padding: "5px",
                overflowY: "auto",
              }}
              defaultStyles={{
                width: "100%",
                jc: "flex-start",
                ai: "flex-start",
              }}
            >
              <Text
                styles={{
                  display: "block",
                  wordWrap: "break-word",
                  width: "100%",
                  height: "100%",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </Flex>
          </Flex>

          {/* 사진 */}

          <Flex
            styles={{ height: "163px", margin: "30px 0 0 0" }}
            defaultStyles={{ width: "100%", jc: "center", ai: "center" }}
          >
            <Image
              shape="rectangle"
              styles={{ objectFit: "contain" }}
              defaultStyles={{ width: "100%", height: "100%" }}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

const PostChattingBox = props => {
  return (
    <>
      <Flex
        styles={{
          height: "100%",
          border: "1px solid #000000",
          marginTop: "30px",
        }}
      >
        채팅창
      </Flex>
    </>
  );
};
