import React from "react";
import { Flex, Grid, Image, Text } from "../elements";

const MyPage = props => {
  return (
    <Flex
      styles={{
        flexDirection: "column",
        height: "100vh",
        justifyContent: "start",
      }}
    >
      <Flex
        styles={{ border: "1px solid blue", width: "80%", maxWidth: "800px" }}
      >
        <Image
          styles={{ width: "200px" }}
          shape="rectangle"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPwLMX0OWBB0a0hBSjy_5dRv7P7gFWxlGnuQ&usqp=CAU"
        ></Image>
        <Flex styles={{ flexDirection: "column" }}>
          <Text styles={{ fontSize: "32px", fontWeight: "600" }}>4</Text>
          <Text>기부 횟수</Text>
        </Flex>
        <Flex styles={{ flexDirection: "column" }}>
          <Text styles={{ fontSize: "32px", fontWeight: "600" }}>
            500,000원
          </Text>
          <Text>기부 금액</Text>
        </Flex>
      </Flex>
      <Flex
        styles={{
          border: "1px solid red",
          width: "80%",
          maxWidth: "800px",
          flexDirection: "column",
          padding: "20px 40px",
          margin: "40px auto",
          gap: "10px",
        }}
      >
        <Flex styles={{ justifyContent: "start" }}>
          <Text
            styles={{
              fontSize: "16px",
              fontWeight: "400",
              width: "200px",
            }}
          >
            이메일
          </Text>
          <Text styles={{ fontSize: "20px", fontWeight: "600" }}>
            testEmail@gmail.com
          </Text>
        </Flex>
        <Flex styles={{ justifyContent: "start" }}>
          <Text
            styles={{
              fontSize: "16px",
              fontWeight: "400",
              width: "200px",
            }}
          >
            닉네임
          </Text>
          <Text styles={{ fontSize: "20px", fontWeight: "600" }}>모코코</Text>
        </Flex>
        <Flex styles={{ justifyContent: "start" }}>
          <Text
            styles={{
              fontSize: "16px",
              fontWeight: "400",
              width: "200px",
            }}
          >
            휴대폰번호
          </Text>
          <Text styles={{ fontSize: "20px", fontWeight: "600" }}>
            01012345678
          </Text>
        </Flex>
      </Flex>
      <Grid
        styles={{
          border: "1px solid green",
          width: "80%",
          maxWidth: "800px",
        }}
      >
        <Image
          styles={{}}
          shape="bak"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPwLMX0OWBB0a0hBSjy_5dRv7P7gFWxlGnuQ&usqp=CAU"
        >
          <Text styles={{ color: "#fff" }}>테스트1</Text>
          <Text styles={{ color: "#fff" }}>테스트2</Text>
          <Text styles={{ color: "#fff" }}>테스트3</Text>
        </Image>
        <Image
          styles={{}}
          shape="bak"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPwLMX0OWBB0a0hBSjy_5dRv7P7gFWxlGnuQ&usqp=CAU"
        >
          <Text styles={{ color: "#fff" }}>테스트4</Text>
          <Text styles={{ color: "#fff" }}>테스트5</Text>
          <Text styles={{ color: "#fff" }}>테스트6</Text>
        </Image>
        <Image
          styles={{}}
          shape="bak"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPwLMX0OWBB0a0hBSjy_5dRv7P7gFWxlGnuQ&usqp=CAU"
        >
          <Text styles={{ color: "#fff" }}>테스트7</Text>
          <Text styles={{ color: "#fff" }}>테스트8</Text>
          <Text styles={{ color: "#fff" }}>테스트9</Text>
        </Image>
        <Image
          styles={{}}
          shape="bak"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPwLMX0OWBB0a0hBSjy_5dRv7P7gFWxlGnuQ&usqp=CAU"
        >
          <Text styles={{ color: "#fff" }}>테스트1</Text>
          <Text styles={{ color: "#fff" }}>테스트2</Text>
          <Text styles={{ color: "#fff" }}>테스트3</Text>
        </Image>
        <Image
          styles={{}}
          shape="bak"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPwLMX0OWBB0a0hBSjy_5dRv7P7gFWxlGnuQ&usqp=CAU"
        >
          <Text styles={{ color: "#fff" }}>테스트4</Text>
          <Text styles={{ color: "#fff" }}>테스트5</Text>
          <Text styles={{ color: "#fff" }}>테스트6</Text>
        </Image>
      </Grid>
    </Flex>
  );
};

export default MyPage;
