import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Flex, InputLogin, Text } from "../elements";
import { actionCreator as userActions } from "../redux/modules/user";
import { useHistory } from "react-router-dom";

const Login = props => {
  const history = useHistory();
  // css용도
  const [isLogin, setIsLogin] = React.useState("login");
  const refTitle = React.useRef();
  const refForm = React.useRef();
  // 데이터 용도

  const loginRef = React.useRef({
    userEmail: null,
    userPassword: null,
  });

  const signUpRef = React.useRef({
    userEmail: null,
    userName: null,
    userPassword: null,
    userPasswordCheck: null,
  });
  const dispatch = useDispatch();

  const moveToLogin = e => {
    setIsLogin("login");
    refTitle.current.style.marginLeft = "0%";
    refForm.current.style.marginLeft = "0%";
  };

  const moveToSignup = e => {
    setIsLogin("signup");
    refTitle.current.style.marginLeft = "-50%";
    refForm.current.style.marginLeft = "-50%";
  };

  // 임시
  const clickLogin = () => {
    // dispatch(
    //   userActions.loginDB({
    //     userEmail: loginRef.current.userEmail.value,
    //     userPassword: loginRef.current.userPassword.value,
    //   })
    // );
    dispatch(
      userActions.loginDB({
        data: { userEmail: "test@test.com", userPassword: "1q2w3e4r" },
        history: history,
      })
      
    );
  };

  const clickSignUp = () => {
    dispatch(
      userActions.signUpDB({
        userEmail: signUpRef.current.userEmail.value,
        userName: signUpRef.current.userName.value,
        userPassword: signUpRef.current.userPassword.value,
      })
    );
  };

  return (
    <Wrapper className="wrapper">
      <TitleContainer styles={{ width: "200%" }} className="title-text">
        <div className="title login" ref={refTitle}>
          <Text styles={{ fontSize: "36px", fontWeight: "600" }}>로그인</Text>
        </div>
        <div className="title signup">
          <Text styles={{ fontSize: "36px", fontWeight: "600" }}>회원가입</Text>
        </div>
      </TitleContainer>
      <FormContainer className="form-container">
        <SlideControl className="slide-controls" state={isLogin}>
          <input
            type="radio"
            name="slide"
            id="login"
            checked={isLogin === "login"}
            readOnly
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={isLogin === "signup"}
            readOnly
          />
          <label htmlFor="login" className="slide login" onClick={moveToLogin}>
            Login
          </label>
          <label
            htmlFor="signup"
            className="slide signup"
            onClick={moveToSignup}
          >
            Signup
          </label>
          <div className="slider-tab"></div>
        </SlideControl>
        <div className="form-inner">
          <div className="login" ref={refForm}>
            <InputLogin
              label="아이디"
              ref={e => (loginRef.current.userEmail = e)}
            ></InputLogin>
            <InputLogin
              label="비밀번호"
              type="password"
              ref={e => (loginRef.current.userPassword = e)}
            ></InputLogin>
            <Button
              styles={{
                backgroundColor: "#000",
                color: "#fff",
                width: "300px",
                height: "60px",
              }}
              _onClick={clickLogin}
            >
              로그인
            </Button>
          </div>
          <div className="signup">
            <InputLogin
              label="이메일"
              ref={e => (signUpRef.current.userEmail = e)}
            ></InputLogin>
            <InputLogin
              label="닉네임"
              ref={e => (signUpRef.current.userName = e)}
            ></InputLogin>
            <InputLogin
              label="비밀번호"
              type="password"
              ref={e => (signUpRef.current.userPassword = e)}
            ></InputLogin>
            <InputLogin
              label="비밀번호"
              type="password"
              ref={e => (signUpRef.current.userPasswordCheck = e)}
            ></InputLogin>
            <Button
              styles={{
                backgroundColor: "#000",
                color: "#fff",
                width: "300px",
                height: "60px",
              }}
              _onClick={clickSignUp}
            >
              가입하기
            </Button>
            <Button
              styles={{
                backgroundColor: "#000",
                color: "#fff",
                width: "300px",
                height: "60px",
              }}
            >
              취소
            </Button>
          </div>
        </div>
      </FormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
  width: 80%;
  height: 100%;
  max-width: 430px;
  min-height: 680px;
  background: #fff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
`;

const TitleContainer = styled.div`
  display: flex;
  width: 200%;
  & .title {
    width: 50%;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
`;

const SlideControl = styled.div`
  position: relative;
  display: flex;
  height: 50px;
  width: 100%;
  overflow: hidden;
  margin: 30px 0 10px 0;
  justify-content: space-between;
  border: 1px solid lightgrey;
  border-radius: 5px;

  input[type="radio"] {
    display: none;
  }

  & .slide {
    height: 100%;
    width: 100%;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
    z-index: 1;
    transition: all 0.6s ease;
  }

  & .slider-tab {
    position: absolute;
    height: 100%;
    width: 50%;
    left: 0;
    z-index: 0;
    border-radius: 5px;
    background-color: #000;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  // signup버튼 체크 시, 슬라이더의 이동 및 각 text 변경
  #signup:checked ~ .slider-tab {
    left: 50%;
  }
  #signup:checked ~ label.signup {
    color: #fff;
    cursor: default;
    user-select: none;
  }
  #signup:checked ~ label.login {
    color: #000;
  }
  #login:checked ~ label.signup {
    color: #000;
  }
  #login:checked ~ label.login {
    cursor: default;
    user-select: none;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  overflow: hidden;

  & .form-inner {
    display: flex;
    width: 200%;
  }

  .form-inner > div {
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 40px;
    gap: 15px;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
`;

export default Login;
