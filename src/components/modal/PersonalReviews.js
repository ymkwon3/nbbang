import React from "react";
import { useSelector } from "react-redux";
import { Flex, Image, Text } from "../../elements";
import moment from "moment";
import "moment/locale/ko";
import { secondaryColor } from "../../shared/color";
const PersonalReviews = ({ userName }) => {
  const reviewList = useSelector(state => state.userpage.reviewList);
  const reviewCount = useSelector(state => state.userpage.reviewCount);
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
        _onClick={e => e.stopPropagation()}
      >
        <Flex styles={{ justifyContent: "flex-start", marginBottom: "30px" }}>
          <Text styles={{ fontSize: "30px", fontWeight: "700" }}>
            <Text
              styles={{
                fontSize: "30px",
                fontWeight: "700",
                color: secondaryColor,
              }}
            >
              {userName}
            </Text>{" "}
            님에 대한 후기 {reviewCount ? reviewCount : 0}개
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
          {reviewCount ? (
            reviewList.map((review, idx) => (
              <UserCard key={review.userName} {...review} />
            ))
          ) : (
            <Text styles={{ fontSize: "20px" }}>
              후기 정보가 존재하지 않습니다.
            </Text>
          )}
        </Flex>
      </Flex>
    </>
  );
};

const UserCard = props => {
  const { userImage, userName, review, createdAt } = props;
  return (
    <>
      <Flex
        styles={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          padding: "20px 10px",
          alignItems: "flex-start",
        }}
      >
        <Flex styles={{ width: "50px", height: "50px", marginRight: "10px" }}>
          <Image
            shape="circle"
            src={userImage}
            styles={{ width: "100%", height: "100%" }}
          />
        </Flex>
        <Flex
          styles={{
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1,
          }}
        >
          <Flex
            styles={{ justifyContent: "space-between", marginBottom: "8px" }}
          >
            <Text styles={{ fontWeight: "600" }}>
              {userName.slice(0, 1) + "*".repeat(userName.length - 1)}
            </Text>
            <Text styles={{ color: "#716969", fontSize: "12px" }}>
              {moment(createdAt).fromNow()}
            </Text>
          </Flex>
          <Flex styles={{ justifyContent: "flex-start" }}>
            <Text>{review}</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default PersonalReviews;
