import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Flex, InputLogin } from "../elements";
import { actionCreator as userActions } from "../redux/modules/user";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
import { getAPI, postAPI } from "../shared/api";
import { notify } from "../components/ToastMessage";

import { primaryColor, secondaryColor, primaryDarked } from "../shared/color";
import {croissant} from "../image/bread"

const Login = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const autoClose = 2000; // toastmessage 매개변수
  const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  // const REDIRECT_URI = "https://n09.shop/kakao-auth/kakao/callback"
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // css용도
  const [isLogin, setIsLogin] = React.useState("login");
  const refForm = React.useRef();

  // 이메일 정규표현식
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

  // 데이터 용도
  const loginRef = React.useRef({
    userEmail: null,
    userPassword: null,
  });

  // 회원가입 입력 값, 확인 값
  const signUpRef = React.useRef({
    userEmail: null,
    userAuth: null,
    userName: null,
    userPassword: null,
    userPasswordCheck: null,
  });

  const [emailText, setEmailText] = React.useState(null);
  const [nameText, setNameText] = React.useState(null);
  const [pwdText, setPwdText] = React.useState(null);
  const [emailAuth, setEmailAuth] = React.useState(false);

  // 로그인, 회원가입 이동 버튼 이벤트
  const moveToLogin = e => {
    setIsLogin("login");
    refForm.current.style.marginLeft = "0%";
    signUpRef.current.userEmail.value = null;
    signUpRef.current.userAuth.value = null;
    signUpRef.current.userName.value = null;
    signUpRef.current.userPassword.value = null;
    signUpRef.current.userPasswordCheck.value = null;
    setEmailText(null);
    setNameText(null);
    setPwdText(null);
    setEmailAuth(false);
  };
  const moveToSignup = e => {
    setIsLogin("signup");
    refForm.current.style.marginLeft = "-50%";
    loginRef.current.userEmail.value = null;
    loginRef.current.userPassword.value = null;
  };

  // 로그인
  const clickLogin = async () => {
    const email = loginRef.current.userEmail.value;
    const pwd = loginRef.current.userPassword.value;

    if (!email || !pwd) {
      notify("warning", "빈칸을 확인해 주세요.", autoClose);
      return;
    }
    dispatch(
      userActions.loginDB({
        userEmail: email,
        userPassword: pwd,
      })
    ).then(res => {
      if (res.payload) {
        history.replace("/");
      }
    });
  };

  // 회원가입
  const clickSignUp = () => {
    const email = signUpRef.current.userEmail.value;
    const name = signUpRef.current.userName.value;
    const pwd = signUpRef.current.userPassword.value;
    const pwdCheck = signUpRef.current.userPasswordCheck.value;

    if (!email || !name || !pwd || !pwdCheck) {
      notify("warning", "빈칸을 확인해 주세요.", autoClose);
      return;
    }

    if (emailText || nameText || pwdText) {
      notify("warning", "입력형식을 확인해 주세요.", autoClose);
      return;
    }

    dispatch(
      userActions.signUpDB({
        userEmail: signUpRef.current.userEmail.value,
        userName: signUpRef.current.userName.value,
        userPassword: signUpRef.current.userPassword.value,
      })
    ).then(res => {
      moveToLogin();
    });
  };

  // 이메일, 닉네임, 비밀번호 확인
  const emailCheck = debounce(() => {
    const email = signUpRef.current.userEmail.value;
    if (!regEmail.test(email)) {
      setEmailText("이메일 형식이 올바르지 않습니다.");
      return;
    }
    postAPI("/user/emailcheck", { userEmail: email }).then(res => {
      if (res.msg === "fail") {
        setEmailText("중복된 이메일입니다.");
      } else {
        setEmailText(null);
      }
    });
  }, 500);

  const nameCheck = debounce(() => {
    const name = signUpRef.current.userName.value;
    if (name.length < 2 || name.length > 8) {
      setNameText("닉네임은 2~8글자입니다.");
      return;
    }
    postAPI("/user/namecheck", { userName: name }).then(res => {
      res.msg === "fail"
        ? setNameText("중복된 닉네임입니다.")
        : setNameText(null);
    });
  }, 500);

  const passwordCheck = debounce(() => {
    const password = signUpRef.current.userPassword.value;
    const passwordCheck = signUpRef.current.userPasswordCheck.value;

    if (password.length < 6 || password.length > 20) {
      setPwdText("비밀번호는 6~20글자입니다.");
      return;
    }

    password !== passwordCheck
      ? setPwdText("비밀번호가 일치하지 않습니다.")
      : setPwdText(null);
  }, 500);

  // todo: 이메일 보내는 속도가 느려서 중간 로딩창이 필요할지도
  // 단순한 alert보다는 toastmessage형식이 조금 더 귀여울지도
  // 이메일 인증 번호 요청
  const requestAuthCode = () => {
    const email = signUpRef.current.userEmail.value;
    if (!regEmail.test(email) || emailText) {
      notify("warning", "이메일 형식이 올바르지 않습니다.", autoClose);
      return;
    }
    postAPI("/user/mail", { userEmail: email }).then(res => {
      if (res.msg === "success") {
        notify("info", "해당 이메일로 인증 메일이 발송되었습니다!", autoClose);
      } else if (res.msg === "fail") {
        notify("error", "5분안에 3번만 요청할 수 있습니다!", autoClose);
      }
    });
  };

  // 이메일 번호 인증
  const emailAuthCode = () => {
    const email = signUpRef.current.userEmail.value;
    const authCode = signUpRef.current.userAuth.value;
    if (!email || !authCode) {
      notify("warning", "이메일 및 인증번호를 입력해주세요", autoClose);
      return;
    }
    postAPI("/user/mailauth", { userEmail: email, authNum: authCode }).then(
      res => {
        if (res.msg === "success") {
          setEmailAuth(true);
          notify("success", "인증이 완료되었습니다!", autoClose);
        } else {
          setEmailAuth(false);
          notify("error", "인증 번호가 올바르지 않습니다!", autoClose);
        }
      }
    );
  };

  //카카오 소셜 로그인
  const clickKaKao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Wrapper className="wrapper">
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
            <Flex
              styles={{
                width: "200px",
                height: "200px",
                border: "1px solid #eee"
              }}
            >
              <img alt="character" src={croissant} style={{width: "120px", height: "120px"}}></img>

            </Flex>
            <InputLogin
              label="아이디"
              ref={e => (loginRef.current.userEmail = e)}
              styles={{ borderRadius: "20px" }}
            ></InputLogin>
            <InputLogin
              label="비밀번호"
              type="password"
              ref={e => (loginRef.current.userPassword = e)}
              styles={{ borderRadius: "20px" }}
            ></InputLogin>
            <Button
              styles={{
                backgroundColor: "#FF5C00",
                color: "#fff",
                maxWidth: "360px",
                width: "80%",
                minHeight: "50px",
                fontSize: "16px",
                fontWeight: "700",
                borderRadius: "20px",
              }}
              _onClick={clickLogin}
            >
              로그인
            </Button>
            <Flex
              styles={{
                justifyContent: "end",
                maxWidth: "360px",
                width: "80%",
              }}
            >
              <Button>아이디ㆍ</Button>
              <Button>비밀번호 찾기</Button>
            </Flex>
            <Flex>
              <Button _onClick={clickKaKao}>카카오소셜로그인임시</Button>
            </Flex>
          </div>
          <div className="signup">
            <Flex
              styles={{ maxWidth: "360px", width: "80%", alignItems: "start" }}
            >
              <InputLogin
                label="이메일"
                ref={e => (signUpRef.current.userEmail = e)}
                readOnly={emailAuth}
                _onChange={emailCheck}
                subText={emailText ? emailText : null}
                className="border-left-radius"
              ></InputLogin>
              <Button
                styles={{
                  width: "100px",
                  height: "50px",
                  backgroundColor: primaryColor,
                  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                }}
                _onClick={requestAuthCode}
                className="border-right-radius"
                _disabled={emailAuth}
              >
                번호요청
              </Button>
            </Flex>
            <Flex
              styles={{ maxWidth: "360px", width: "80%", alignItems: "start" }}
            >
              <InputLogin
                label="인증번호"
                ref={e => (signUpRef.current.userAuth = e)}
                readOnly={emailAuth}
                className="border-left-radius"
              ></InputLogin>
              <Button
                styles={{
                  width: "100px",
                  height: "50px",
                  backgroundColor: primaryColor,
                  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                }}
                _onClick={emailAuthCode}
                className="border-right-radius"
                _disabled={emailAuth}
              >
                번호인증
              </Button>
            </Flex>
            <InputLogin
              label="닉네임"
              ref={e => (signUpRef.current.userName = e)}
              _onChange={nameCheck}
              subText={nameText ? nameText : null}
            ></InputLogin>
            <InputLogin
              label="비밀번호"
              type="password"
              ref={e => (signUpRef.current.userPassword = e)}
              _onChange={passwordCheck}
            ></InputLogin>
            <InputLogin
              label="비밀번호 확인"
              type="password"
              ref={e => (signUpRef.current.userPasswordCheck = e)}
              _onChange={passwordCheck}
              subText={pwdText ? pwdText : null}
            ></InputLogin>
            <Button
              styles={{
                backgroundColor: secondaryColor,
                color: "#fff",
                maxWidth: "360px",
                width: "80%",
                minHeight: "50px",
                fontSize: "16px",
                fontWeight: "700",
                borderRadius: "20px",
              }}
              _disabled={!emailAuth}
              _onClick={clickSignUp}
            >
              가입하기
            </Button>
            <Button
              styles={{
                backgroundColor: primaryDarked,
                color: "#fff",
                maxWidth: "360px",
                width: "80%",
                minHeight: "50px",
                fontSize: "16px",
                fontWeight: "700",
                borderRadius: "20px",
              }}
              _onClick={moveToLogin}
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
  width: 80vw;
  height: 100%;
  max-width: 430px;
  max-height: 600px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const SlideControl = styled.div`
  position: relative;
  display: flex;
  height: 50px;
  width: 100%;
  max-width: 430px;
  overflow: hidden;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);

  input[type="radio"] {
    display: none;
  }

  & .slide {
    height: 100%;
    width: 100%;
    font-size: 20px;
    font-weight: 900;
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
    background-color: ${primaryColor};
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  // signup버튼 체크 시, 슬라이더의 이동 및 각 text 변경
  #signup:checked ~ .slider-tab {
    left: 50%;
  }
  #signup:checked ~ label.signup {
    color: #000;
    cursor: default;
    user-select: none;
  }
  #signup:checked ~ label.login {
    color: #626262;
  }
  #login:checked ~ label.signup {
    color: #626262;
  }
  #login:checked ~ label.login {
    cursor: default;
    user-select: none;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  .form-inner {
    display: flex;
    width: 200%;
    height: calc(100% - 50px);
  }

  .form-inner > div {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    margin-top: 50px;
    gap: 10px;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
`;

export default Login;
