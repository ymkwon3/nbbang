import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Flex, Button, Text, Image } from "../elements";

const PostDetail = () => {
  const detailInfo = useSelector(state => state.post.postDetail);
  console.log(detailInfo)
  const userInfo = useSelector(state => state.user.userInfo);

  return (
    <Flex>
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
            width: "432px",
            height: "100%",
            zIndex: "20",
            backgroundColor: "rgba( 220, 220, 220, 0.6 )",
          }}
        >
          <Text
            styles={{
              fontSize: "28px",
              fontWeight: "800",
              alignItems: "start",
            }}
          />
          <Flex styles={{ margin: "0 0 14px 0" }}>
            <Flex>
              <Image
                styles={{
                  with: "38px",
                  height: "38px",
                  margin: "0  120px 0 30px",
                }}
                src={userInfo.userImage}
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
                1/{detailInfo.headCount}
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
                {detailInfo.title}
              </Text>
              <Text>{detailInfo.category}</Text>
              <Flex styles={{ justifyContent: "space-between" }}>
                <Text>가격 : {detailInfo.price}</Text>
                <Text styles={{ margin: "0 160px 0 0" }}>
                  기한 : {detailInfo.endTime}
                </Text>
              </Flex>
              <Text>내용 : {detailInfo.content}</Text>
            </Flex>
            <Image
              styles={{
                width: "332px",
                height: "225px",
                borderRadius: "27px",
                margin: "20px 0 20px",
              }}
              src={detailInfo.image}
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
  );
};

export default PostDetail;
