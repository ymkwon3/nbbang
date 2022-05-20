import React from "react";

const Test = props => {
  const href = window.location.href;
  let params = new URL(document.location).searchParams;
  let code = params.get("code");
  console.log(code)
  return (
    <>
      <>test</>
    </>
  );
};

export default Test;
