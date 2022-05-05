import React from "react";
import { useDispatch } from "react-redux";

import { Flex, Button, Text, Image } from "../elements";

const PostDetail = props => {
  const { userInfocard } = props;
  const dispatch = useDispatch();

  const infoRef = React.useRef({});

  return (
    <Flex
      styles={{
        width: "432px",
        height: "100%",
        zIndex: "20",
        backgroundColor: "rgba( 220, 220, 220, 0.6 )",
      }}
    >
      <Flex
        styles={{
          width: "387px",
          height: "93%",
          zIndex: "30",
          backgroundColor: "white",
          flexDirection: "column",
        }}
      >
        <Flex
          styles={{
            margin: "0 0 14px 0",
          }}
        >
          <Flex>
            <Image
              styles={{
                with: "38px",
                height: "38px",
                margin: "0  120px 0 30px",
              }}
              src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MjVfMTg0%2FMDAxNjUwODIyMTI3MTAw.mzdywA3B_PwpeA6IfsI-c982D546Gp6h78fVqUt-y1sg.dIV0gb1HM7gMNe5dAEqkXP-_YMu6m3IfWUyALBHDsmcg.JPEG.adorable_woon%2FIMG_5647.jpg&type=a340"
            />
          </Flex>
          <Flex>
            <Text
              styles={{
                width: "54px",
                height: "28px",
                margin: "0 0 0 80px",
                padding: "5px",
                // backgroundColor:"black"
                border: "1px solid",
                borderRadius: "30px",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              1/5
            </Text>
          </Flex>
        </Flex>
        <Flex styles={{ flexDirection: "column" }}>
          <Flex
            styles={{
              flexDirection: "column",
              gap: "5px",
              padding: "0 10px",
              alignItems: "flex-start",
            }}
          >
            <Text
              styles={{
                fontSize: "28px",
                fontWeight: "800",
                alignItems: "start",
              }}
            >
              title
            </Text>
            <Text>카테고리</Text>
            <Flex styles={{ justifyContent: "space-between" }}>
              <Text>가격 : </Text>
              <Text styles={{ margin: "0 160px 0 0" }}>기한 : </Text>
            </Flex>
            <Text>
              내용 : 위 예제는 axios를 사용하기 위해 import 한 후 axios.defaults
              속성 중 하나인 baseURL을 jsonplaceholder 서버로 설정한다. getList
              함수는 axios.get 함수를 사용하여 HTTP GET 메소드를 호출한다.
              useEffect 내부를 살펴보면 getList 함수를 호출한다. 성공적인 경우
              setList 함수를 호출하여 응답으로 전달된 데이터를 저장한다. 데이터
              저장 시 slice를 이용해 최신 20개 데이터만 조회
            </Text>
          </Flex>
          <Image
            styles={{
              width: "332px",
              height: "225px",
              borderRadius: "27px",
              margin: "20px 0 20px",
            }}
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MTRfMTA4%2FMDAxNjQ5OTMzNDg0NDcx.SCiINEwEbTRYRjs0P3BTHKYW_uE8bl4_aSQDvliQnHEg.m1JIKebpiidFMwKOcmoND8ityw5ufbNgBvbuyYFznpMg.JPEG.grrbfl%2Foutput_2236897971.jpg&type=l340_165"
            shape={"rectangle"}
          />
          <Button
            styles={{
              width: "155px",
              height: "41px",
              backgroundColor: "grey",
              borderRadius: "30px",
              margin: "0 0 12px 0",
            }}
          >
            채팅 참여
          </Button>
          <Button
            styles={{
              width: "155px",
              height: "41px",
              backgroundColor: "grey",
              borderRadius: "30px",
            }}
          >
            거래 완료!
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostDetail;
