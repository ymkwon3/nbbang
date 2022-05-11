import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Flex, Image } from "../elements";
import { removeToken } from "../shared/localStorage";
import { actionCreator as postActions } from "../redux/modules/post";
import SearchBox from "./SearchBox";

import { RiSearchLine } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";

import { useHistory, useLocation } from "react-router-dom";

import logo from "../image/logo.svg";

const Header = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const userInfo = useSelector(state => state.user.userInfo);
  const isLogin = useSelector(state => state.user.isLogin);
  const category = useSelector(state => state.post.category);



  React.useEffect(() => {
    console.log("location changed", location);
  }, [location]);

  const clickLogout = () => {
    //temp
    history.push("/login");
  };

  const clickLogin = () => {
    history.push("/login");
  };

  const clickLogo = () => {
    history.push("/");
  };

  const categoryStyle = {
    width: "145px",
    height: "40px",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "500",
  };

  const checkedStyle = {
    color: "#fff",
    backgroundColor: "#FF5C00",
    width: "145px",
    height: "40px",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "500",
  };

  return (
    <Flex
      styles={{
        height: "60px",
        backgroundColor: "#19253D",
        boxShadow: "0 8px 10px -4px rgba(0, 0, 0, 0.2)",
        zIndex: 11,
        position: "fix",
        top: "0",
        padding: "0 50px",
      }}
    >
      <Flex>
        <img
          src={logo}
          alt="logo"
          style={{ width: "50px", height: "40px", cursor: "pointer" }}
          onClick={clickLogo}
        ></img>
        {location.pathname === "/" ? (
          <Flex styles={{ justifyContent: "space-between" }}>
            <Flex styles={{ width: "fit-content", gap: "15px" }}>
              <SearchBox ></SearchBox>
              <Button
                styles={category === "all" ? checkedStyle : categoryStyle}
                _onClick={() => dispatch(postActions.updateCategory("all"))}
              >
                전체
              </Button>
              <Button
                styles={category === "buy" ? checkedStyle : categoryStyle}
                _onClick={() => dispatch(postActions.updateCategory("buy"))}
              >
                같이 사자
              </Button>
              <Button
                styles={category === "eat" ? checkedStyle : categoryStyle}
                _onClick={() => dispatch(postActions.updateCategory("eat"))}
              >
                같이 먹자
              </Button>
            </Flex>

            {isLogin ? (
              <Flex
                styles={{ gap: "15px", width: "fit-content" }}
                _onClick={clickLogout}
              >
                <AiOutlineHeart color="#fff" size="25" />
                <IoMdNotifications color="#fff" size="25" />
                <Image
                  styles={{ width: "38px", height: "38px" }}
                  src={userInfo.userImage}
                ></Image>
              </Flex>
            ) : (
              <Flex styles={{ width: "fit-content" }}>
                <Button
                  styles={{ width: "100px", height: "40px" }}
                  _onClick={clickLogin}
                >
                  로그인
                </Button>
              </Flex>
            )}
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default Header;
