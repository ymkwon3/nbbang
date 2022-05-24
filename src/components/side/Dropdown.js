import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "../../elements";
import "moment/locale/ko";

import { actionCreator as postActions } from "../../redux/modules/post";
import { secondaryColor } from "../../shared/color";

const Dropdown = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.isLogin);
  const selectRef = React.useRef(null);
  const options = [
    {
      key: "최신순",
      value: "late",
    },
    {
      key: "임박순",
      value: "due",
    },
  ];
  isLogin && options.push({ key: "찜순", value: "like" });
  const changeEvent = () => {
    const select = selectRef.current.value;
    if (select === "late") dispatch(postActions.updateLastPostList());
    else if (select === "due") dispatch(postActions.updateEndPostList());
    else if (select === "like") dispatch(postActions.updateLikePostList());
  };
  return (
    <Select
      styles={{
        width: "70px",
        height: "30px",
        outline: "none",
        color: secondaryColor
      }}
      ref={e => (selectRef.current = e)}
      _onChange={changeEvent}
      options={options}
      title="sort"
    ></Select>
  );
};

export default Dropdown;
