import React from "react";
import { useDispatch } from "react-redux";
import { Flex } from "../elements";
import { actionCreator as userActions } from "../redux/modules/user";

const KaKaoUri = () => {
  const dispatch = useDispatch()
  const params = new URL(document.location).searchParams;
  const code = params.get("code");
  console.log(code);
  React.useEffect(() => {
    dispatch(userActions.kakaoLogin(code))
  }, [])
  return (
    <Flex>
      <>
        응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애응애
      </>
    </Flex>
  );
};

export default KaKaoUri;
