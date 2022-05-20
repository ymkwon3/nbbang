import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Flex } from "../elements";
import { actionCreator as userActions } from "../redux/modules/user";

const KaKaoUri = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = new URL(document.location).searchParams;
  const code = params.get("code");
  console.log(code);
  React.useEffect(() => {
    dispatch(userActions.kakaoLogin(code)).then(res => {
      console.log(res)
      history.replace('/')
    })
  }, [])
  return (
    <Flex>
      <>
        로그인중
      </>
    </Flex>
  );
};

export default KaKaoUri;
