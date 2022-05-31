import React from "react";
import { Button, Flex, Text } from "../../elements";
import { secondaryColor } from "../../shared/color";
import { Desktop, Mobile } from "../../shared/Responsive";
import styled from "styled-components";

import { actionCreator as userActions } from "../../redux/modules/userpage";
import { useDispatch } from "react-redux";

const PostReview = ({ v, close }) => {
  const { userId, writer, postId } = v;
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);

  const clickReview = () => {
    if (inputRef.current.value) {
      dispatch(
        userActions.setReviewDB({
          userId,
          postId,
          review: inputRef.current.value,
        })
      );
      close();
    }
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
        padding: "20px 10px",
      }}
      _onClick={e => e.stopPropagation()}
    >
      <Flex
        styles={{ flexDirection: "column", alignItems: "start", width: "90%" }}
      >
        <Text styles={{ fontSize: "18px", fontWeight: "600" }}>
          이번 공구는 어떠셨나요?{" "}
          <Desktop>
            <Text styles={{ color: secondaryColor, fontWeight: "600" }}>
              {writer}
            </Text>
            님에게 글을 남겨주세요!
          </Desktop>
        </Text>
        <Mobile>
          <Text styles={{ fontSize: "18px", fontWeight: "600" }}>
            <Text styles={{ color: secondaryColor, fontWeight: "600" }}>
              {writer}
            </Text>
            님에게 글을 남겨주세요!
          </Text>
        </Mobile>
      </Flex>
      <InputStyle ref={inputRef}></InputStyle>
      <Flex styles={{ justifyContent: "end", gap: "10px", width: "90%" }}>
        <Button
          styles={{
            width: "90px",
            height: "30px",
            backgroundColor: secondaryColor,
            borderRadius: "30px",
            color: "#fff",
            fontWeight: "600",
            fontSize: "18px",
          }}
          _onClick={clickReview}
        >
          남기기
        </Button>
      </Flex>
    </Flex>
  );
};

const InputStyle = styled.input`
  width: 90%;
  margin: 10px 0;
  padding: 0 10px;
  height: 40px;
  outline: none;
  border: 1px solid #aaa;
`;

export default PostReview;
