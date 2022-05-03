import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "./localStorage";

import { actionCreator as userActions } from "../redux/modules/user";

const Permit = ({children}) => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.isLogin);
  if(getToken() && !isLogin) {
    dispatch(userActions.isLoginDB());
  }
  return (
    <>
      {children}
    </>
  );
};

export default Permit;