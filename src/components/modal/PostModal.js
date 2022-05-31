import React from "react";
import { Flex, Image, Text } from "../../elements";

import {
  eatCategory,
  buyCategory,
  price,
  calendar,
  address,
  content,
} from "../../image";

import moment from "moment";
import "moment/locale/ko";
import { secondaryColor } from "../../shared/color";

const PostModal = ({ v }) => {
  const iconStyles = {
    width: "24px",
    height: "24px",
    marginRight: "10px",
  };
  const valueStyles = {
    fontSize: "16px",
    fontWeight: "400",
  };
  return (
    <Flex
      styles={{
        maxWidth: "600px",
        width: "80vw",
        maxHeight: "90vh",
        backgroundColor: "#fff",
        flexDirection: "column",
        justifyContent: "start",
        borderRadius: "10px",
        overflow: "scroll",
      }}
      _onClick={e => e.stopPropagation()}
    >
      <Flex styles={{ flexDirection: "column", padding: "25px" }}>
        <Flex styles={{ marginBottom: "10px" }}>
          <Flex
            styles={{
              width: "fit-content",
              flex: 3,
              justifyContent: "start",
            }}
          >
            <Image
              styles={{
                width: "50px",
                height: "50px",
              }}
              src={v.userImage}
            />
            <Text
              styles={{
                marginLeft: "10px",
                fontWeight: "700",
                fontSize: "20px",
                fontFamily: "Cafe24Ssurround",
              }}
            >
              {v.writer}
            </Text>
          </Flex>

          <Flex
            styles={{
              width: "60px",
              height: "30px",
              borderRadius: "20px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            {v.headList.length}/{v.headCount}
          </Flex>
        </Flex>
        <Flex styles={{ justifyContent: "start", marginBottom: "6px" }}>
          {/* <img alt="price" src={priceGray} style={{ marginRight: "5px" }}></img> */}
          {v.category === "eat" ? (
            <img alt="eat" src={eatCategory} style={iconStyles}></img>
          ) : (
            <img alt="buy" src={buyCategory} style={iconStyles}></img>
          )}
          <Text
            styles={{
              fontSize: "16px",
              fontWeight: "600",
              color: secondaryColor,
            }}
          >
            {v.type}
          </Text>
        </Flex>
        <Flex styles={{ justifyContent: "start" }}>
          <Text
            styles={{
              fontSize: "28px",
              fontWeight: "800",
            }}
          >
            {v.title}
          </Text>
        </Flex>
      </Flex>
      <Image shape="rectangle" src={v.image} />
      <Flex styles={{ flexDirection: "column", padding: "25px" }}>
        <Flex
          styles={{
            flexDirection: "column",
            gap: "25px",
            alignItems: "flex-start",
          }}
        >
          <Flex styles={{ justifyContent: "space-between" }}>
            <Flex styles={{ flex: 1, justifyContent: "start" }}>
              <img alt="price" src={price} style={iconStyles}></img>
              <Text styles={valueStyles}>
                {v.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              </Text>
            </Flex>
            <Flex styles={{ flex: 1, justifyContent: "start" }}>
              <img alt="calendar" src={calendar} style={iconStyles}></img>
              <Text styles={valueStyles}>
                {moment(v.endTime).format("MM-DD")} 까지
              </Text>
            </Flex>
          </Flex>
          <Flex styles={{ justifyContent: "start" }}>
            <img alt="address" src={address} style={iconStyles}></img>
            <Text styles={valueStyles}>{v.address}</Text>
          </Flex>
          <Flex styles={{ justifyContent: "start" }}>
            <img alt="content" src={content} style={iconStyles}></img>
            <Text styles={valueStyles}>{v.content}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostModal;