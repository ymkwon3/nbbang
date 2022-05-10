import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Flex, InputLogin, Text } from "../elements";
import { actionCreator as userActions } from "../redux/modules/user";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
import { postAPI } from "../shared/api";

const Login = props => {
  const history = useHistory();
  const dispatch = useDispatch();

  // css용도
  const [isLogin, setIsLogin] = React.useState("login");
  const refForm = React.useRef();

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
      alert("빈칸을 확인해 주세요.");
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
      alert("빈칸을 확인해 주세요.");
      return;
    }

    if (emailText || nameText || pwdText) {
      alert("입력형식을 확인해 주세요.");
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
    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    if (!regEmail.test(email)) {
      setEmailText("이메일 형식이 올바르지 않습니다.");
      return;
    }
    postAPI("/user/emailcheck", { userEmail: email }).then(res => {
      res.msg === "fail"
        ? setEmailText("중복된 이메일입니다.")
        : setEmailText(null);
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
  // 이메일 인증 번호 요청
  const requestAuthCode = () => {
    const email = signUpRef.current.userEmail.value;
    postAPI("/user/mail", { userEmail: email }).then(res => {
      if (res.msg === "success") {
        alert("해당 이메일로 인증 메일이 발송되었습니다!");
      }
    });
  };

  // 이메일 번호 인증
  const emailAuthCode = () => {
    const email = signUpRef.current.userEmail.value;
    const authCode = signUpRef.current.userAuth.value;
    postAPI("/user/mailauth", { userEmail: email, authNum: authCode }).then(
      res => {
        if (res.msg === "success") {
          setEmailAuth(true);
          alert("인증이 완료되었습니다!");
        } else {
          setEmailAuth(false);
          alert("인증 번호가 올바르지 않습니다!");
        }
      }
    );
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
                backgroundColor: "#FF5C00",
                color: "#fff",
                width: "360px",
                height: "50px",
                fontSize: "16px",
                fontWeight: "700",
              }}
              _onClick={clickLogin}
            >
              로그인
            </Button>
            <Flex styles={{ justifyContent: "end", width: "360px" }}>
              <Button>아이디ㆍ</Button>
              <Button>비밀번호 찾기</Button>
            </Flex>
          </div>
          <div className="signup">
            <Flex styles={{ maxWidth: "360px", alignItems: "start" }}>
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
                  backgroundColor: "#19253D",
                  color: "#fff",
                  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                }}
                _onClick={requestAuthCode}
                className="border-right-radius"
                _disabled={emailAuth}
              >
                번호요청
              </Button>
            </Flex>
            <Flex styles={{ maxWidth: "360px", alignItems: "start" }}>
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
                  backgroundColor: "#19253D",
                  color: "#fff",
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
                backgroundColor: "#FF5C00",
                color: "#fff",
                width: "360px",
                height: "50px",
                fontSize: "16px",
                fontWeight: "700",
              }}
              _disabled={!emailAuth}
              _onClick={clickSignUp}
            >
              가입하기
            </Button>
            <Button
              styles={{
                backgroundColor: "#19253D",
                color: "#fff",
                width: "360px",
                height: "50px",
                fontSize: "16px",
                fontWeight: "700",
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
  width: 90%;
  height: 100%;
  max-width: 430px;
  max-height: 730px;
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
    color: #fff;
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
    background-color: #19253d;
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
  height: 100%;
  overflow: hidden;

  .form-inner {
    display: flex;
    width: 200%;
    height: 680px;
  }

  .form-inner > div {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
`;

export default Login;
