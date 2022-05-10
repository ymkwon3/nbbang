import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Flex, Image } from "../elements";
import styled from "styled-components";
import { actionCreator as postActions } from "../redux/modules/post";
import { actionCreator as userActions } from "../redux/modules/user";
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

  const [drop, setDrop] = React.useState(false);

  const clickLogout = () => {
    //temp
    dispatch(userActions.logout());
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
    fontSize: "18px",
    fontWeight: "500",
  };

  const checkedStyle = {
    color: "#fff",
    backgroundColor: "#FF5C00",
    width: "145px",
    height: "40px",
    borderRadius: "30px",
    fontSize: "18px",
    fontWeight: "500",
  };

  return (
    <Flex
      styles={{
        height: "70px",
        backgroundColor: "#19253D",
        boxShadow: "0 8px 10px -4px rgba(0, 0, 0, 0.2)",
        zIndex: 11,
        position: "fix",
        top: "0",
        padding: "0 50px",
      }}
    >
      <Flex styles={{ justifyContent: "start" }}>
        <img
          src={logo}
          alt="logo"
          style={{ width: "50px", height: "40px", cursor: "pointer" }}
          onClick={clickLogo}
        ></img>
        {location.pathname === "/" ? (
          <Flex styles={{ justifyContent: "space-between" }}>
            <Flex styles={{ width: "fit-content", gap: "15px" }}>
              <SearchInput>
                <SearchBox ></SearchBox>
                {/* <Button _onClick={() => dispatch(postActions.searchPost(searchTerm))}><RiSearchLine size="27.22" color="#19253D" /></Button> */}
              </SearchInput>
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
              <Flex styles={{ gap: "15px", width: "fit-content" }}>
                <AiOutlineHeart color="#fff" size="25" />
                <IoMdNotifications color="#fff" size="25" />
                <Image
                  styles={{ width: "38px", height: "38px" }}
                  src={userInfo.userImage}
                  className="hover-event"
                  _onClick={() => setDrop(prev => !prev)}
                ></Image>
                {drop ? (
                  <Flex
                    styles={{
                      flexDirection: "column",
                      position: "absolute",
                      backgroundColor: "#fff",
                      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                      width: "200px",
                      top: "60px",
                      borderRadius: "20px",
                      padding: "10px",
                      gap: "10px",
                    }}
                  >
                    <Button
                      styles={{
                        fontSize: "14px",
                      }}
                      _onClick={() => {history.push(`/mypage/${userInfo?.userId}`)}}
                    >
                      마이페이지
                    </Button>
                    <Button
                      styles={{
                        fontSize: "14px",
                        color: "#FF5C00"
                      }}
                      _onClick={clickLogout}
                    >
                      로그아웃
                    </Button>
                  </Flex>
                ) : null}
              </Flex>
            ) : (
              <Flex styles={{ width: "fit-content" }}>
                <Button
                  styles={{ width: "90px", height: "40px", borderRadius: "27px" }}
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

const SearchInput = styled.div`
  position: relative;
  margin: 0 20px 0 40px;
  & > input {
    width: 380px;
    height: 40px;
    border-radius: 30px;
    padding: 0 40px;
    border: none;
    outline: none;
  }

  & > *:nth-child(2) {
    position: absolute;
    right: 10px;
    top: 6px;
  }
`;

export default Header;
