import React from "react";
import { Flex, Image, Text } from "../../elements";

const PersonalReviews = () => {
  return (
    <>
      <Flex
        className="removeScroll"
        styles={{
          flexDirection: "column",
          position: "relative",
          width: "80vw",
          height: "80vh",
          maxWidth: "600px",
          maxHeight: "900px",
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "20px",
          justifyContent: "flex-start",
        }}
        _onClick={(e) => e.stopPropagation()}
      >
        <Flex styles={{ justifyContent: "flex-start", marginBottom: "30px" }}>
          <Text styles={{ fontSize: "30px", fontWeight: "700" }}>
            영민님에 대한 후기 10개
          </Text>
        </Flex>
        <Flex
          styles={{
            flexDirection: "column",
            justifyContent: "flex-start",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </Flex>
      </Flex>
    </>
  );
};

const UserCard = () => {
  return (
    <>
      <Flex
        styles={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          padding: "20px 10px",
        }}
      >
        <Flex styles={{ width: "50px", height: "50px", marginRight: "15px" }}>
          <Image shape="circle" styles={{ width: "100%", height: "100%" }} />
        </Flex>
        <Flex styles={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Flex
            styles={{ justifyContent: "space-between", marginBottom: "5px" }}
          >
            <Text styles={{ fontWeight: "600" }}>햇빛가득장미가득</Text>
            <Text styles={{ color: "#716969", fontSize: "12px" }}>
              1개월 전
            </Text>
          </Flex>
          <Text>감사합니다. 잘쓰겠습니다~^^</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default PersonalReviews;
