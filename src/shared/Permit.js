import React from "react";
import { useSelector } from "react-redux";

const Permit = ({children}) => {
  const isLogin = useSelector(state => state.user.isLogin);

  return (
    <>
      {isLogin ? children : null}
    </>
  );
};

export default Permit;