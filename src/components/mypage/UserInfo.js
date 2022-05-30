import React from "react";
import { Button, Flex, Image, Text } from "../../elements";
import { primaryColor, secondaryColor } from "../../shared/color";
import { Desktop } from "../../shared/Responsive";

import { edit } from "../../image";

const UserInfo = props => {
  const { userInfo, _setIsUpdate, isUpdate, loginUserId, userId, myListLen } =
    props;
  // isDesktop === undefined 일 경우가 데스크톱 상태
  const isDesktop = Desktop(0);

  return (
    <>
      <Flex styles={{ flexDirection: "column" }}>
        <label htmlFor="profile" style={{ position: "relative" }}>
          <Image
            src={userInfo?.userImage}
            styles={{
              width: isDesktop === undefined ? "200px" : "120px",
              height: isDesktop === undefined ? "200px" : "120px",
              border: `5px solid ${isUpdate ? secondaryColor : primaryColor}`,
            }}
            shape="circle"
          />
          {loginUserId === userId && !isUpdate ? (
            <img
              alt="edit"
              src={edit}
              className="hover-event"
              style={{
                position: "absolute",
                bottom: isDesktop === undefined ? "15px" : "10px",
                right: isDesktop === undefined ? "15px" : "10px",
                width: isDesktop === undefined ? "30px" : "20px",
              }}
              onClick={() => _setIsUpdate(true)}
            ></img>
          ) : null}
        </label>
        <Button
          styles={{
            width: isDesktop === undefined ? "120px" : "90px",
            minHeight: isDesktop === undefined ? "40px" : "30px",
            marginTop: "15px",
            backgroundColor: primaryColor,
            borderRadius: "30px",
            fontSize: isDesktop === undefined ? "22px" : "16px",
            fontFamily: "Cafe24SsurroundAir",
            fontWeight: "600",
          }}
        >
          공구 후기
        </Button>
      </Flex>

      <Flex
        styles={{
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Text
          styles={{
            fontSize: isDesktop === undefined ? "32px" : "24px",
            fontFamily: "Cafe24Ssurround",
            fontWeight: "500",
            whiteSpace: "nowrap",
          }}
        >
          <Text
            styles={{
              fontSize: "inherit",
              fontFamily: "Cafe24Ssurround",
              color: "#FF5C00",
            }}
          >
            {userInfo?.userName}
          </Text>
          {isDesktop === undefined ? " 님 반갑습니다!" : null}
        </Text>
        <Text
          styles={{
            fontSize: isDesktop === undefined ? "22px" : "16px",
            fontWeight: "400",
            margin: "20px 0 40px",
          }}
        >
          <Flex
            styles={{
              overflow: "scroll",
              padding: "5px",
              alignItems: "start"
            }}
          >
            {userInfo?.statusMsg ? userInfo?.statusMsg : "안녕하세요!"}
          </Flex>
        </Text>
        <Flex>
          <Flex styles={{ flexDirection: "column" }}>
            <Text
              styles={{
                fontSize: isDesktop === undefined ? "26px" : "18px",
                fontFamily: "Cafe24SsurroundAir",
                fontWeight: "700",
              }}
            >
              {isDesktop === undefined ? "작성한 게시글" : "작성 글"}
            </Text>
            <Text
              styles={{
                fontSize: isDesktop === undefined ? "22px" : "16px",
                fontWeight: "600",
                color: "#FF5C00",
              }}
            >
              {myListLen}건
            </Text>
          </Flex>
          <Flex styles={{ flexDirection: "column" }}>
            <Text
              styles={{
                fontSize: isDesktop === undefined ? "26px" : "18px",
                fontFamily: "Cafe24SsurroundAir",
                fontWeight: "700",
              }}
            >
              {"거래 완료"}
            </Text>
            <Text
              styles={{
                fontSize: isDesktop === undefined ? "22px" : "16px",
                fontWeight: "600",
                color: "#FF5C00",
              }}
            >
              {userInfo?.tradeCount ? userInfo.tradeCount : 0}건
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default UserInfo;
