import React from "react";
import { Button, Flex, Image, InputLogin } from "../../elements";
import {
  primaryColor,
  primaryDarked,
  secondaryColor,
} from "../../shared/color";
import { Desktop } from "../../shared/Responsive";
import _ from "lodash";
import { postAPI } from "../../shared/api";
import { actionCreator as userActions } from "../../redux/modules/userpage";
import { actionCreator as user } from "../../redux/modules/user";
import { useDispatch } from "react-redux";
import Modal from "../../shared/Modal";
import Confirm from "../modal/Confirm";
import { useHistory } from "react-router-dom";

const UserUpdate = props => {
  const { userInfo, _setIsUpdate, isUpdate } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  // isDesktop === undefined 일 경우가 데스크톱 상태
  const isDesktop = Desktop(0);

  const [isConfirm, setIsConfirm] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);

  // 닉네임, 상태메시지 관리
  const nameRef = React.useRef(null);
  const statusMsgRef = React.useRef(null);
  const [name, setName] = React.useState(null);
  const [stateMsg, setStateMsg] = React.useState(null);

  // 프로필 이미지 관리
  const [preview, setPreview] = React.useState(null);
  const [image, setImage] = React.useState(null);

  // 유저이미지 변경
  const setUserImage = e => {
    //사진이 변경되었으면 미리보기, 사진 데이터 저장
    if (e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  // 수정하기
  const userUpdate = () => {
    const formData = new FormData();
    formData.append("userImage", image);
    formData.append("userName", nameRef.current.value);
    formData.append("statusMsg", statusMsgRef.current.value);
    dispatch(userActions.setUserDB(formData));
    dispatch(user.setUserImage(preview))
    _setIsUpdate(false);
  };


  // 이름, 상태메시지 검증
  const checkInput = _.debounce((e, type) => {
    if (type === "name") {
      if(userInfo.userName === nameRef.current.value) {
        setName(null);
        return;
      }
      if (
        nameRef.current.value.length < 2 ||
        nameRef.current.value.length > 8
      ) {
        setName("닉네임은 2~8글자입니다.");
        return;
      }
      postAPI("/user/namecheck", { userName: nameRef.current.value }).then(
        res => {
          res.msg === "fail" ? setName("중복된 닉네임입니다.") : setName(null);
        }
      );
    } else if (type === "state") {
      if (statusMsgRef.current.value.length > 50) {
        setStateMsg("상태메시지는 50글자 이하입니다.");
        return;
      }
      setStateMsg(null);
    }
  }, 500);


  // 회원탈퇴
  const userDelete = () => {
    dispatch(user.userDelete(userInfo.userId))
    history.replace("/login")
  }

  React.useEffect(() => {
    if (nameRef.current) {
      nameRef.current.value = userInfo.userName;
      statusMsgRef.current.value = userInfo.statusMsg
        ? userInfo.statusMsg
        : "안녕하세요!";
    }
  }, [isUpdate]);

  return (
    <>
      <Flex styles={{ flexDirection: "column" }}>
        <label
          htmlFor="profile"
          style={{
            cursor: "pointer",
          }}
        >
          <Image
            src={preview ? preview : userInfo?.userImage}
            styles={{
              width: isDesktop === undefined ? "200px" : "120px",
              height: isDesktop === undefined ? "200px" : "120px",
              border: `5px solid ${primaryColor}`,
            }}
            shape="circle"
          />
        </label>
        <input
          onChange={e => setUserImage(e)}
          id="profile"
          type="file"
          style={{ visibility: "hidden", width: "0" }}
        ></input>
        <Button
          styles={{
            position: "absolute",
            bottom: "20px",
            color: secondaryColor,
          }}
          _onClick={() => setIsDelete(true)}
        >
          회원 탈퇴
        </Button>
      </Flex>

      <Flex
        styles={{
          flexDirection: "column",
          marginLeft: "20px",
          height: "100%",
          width:
            isDesktop === undefined
              ? "calc(100% - 200px)"
              : "calc(100% - 120px)",
          gap: "25px",
        }}
      >
        <InputLogin
          label="이름"
          ref={nameRef}
          styles={{
            fontSize: isDesktop === undefined ? "18px" : "14px",
            fontWeight: "500",
            color: "#666",
            border: `2px solid ${primaryColor}`,
            outline: `2px solid ${primaryColor}`,
          }}
          subText={name}
          _onChange={e => checkInput(e, "name")}
        ></InputLogin>

        <InputLogin
          label="상태메시지"
          ref={statusMsgRef}
          styles={{
            fontSize: isDesktop === undefined ? "18px" : "14px",
            fontWeight: "500",
            color: "#666",
            border: `2px solid ${primaryColor}`,
            outline: `2px solid ${primaryColor}`,
            height: "80px",
          }}
          subText={stateMsg}
          _onChange={e => checkInput(e, "state")}
          textarea
        ></InputLogin>
        <Flex
          styles={{
            gap: "20px",
          }}
        >
          <Button
            _onClick={() => _setIsUpdate(false)}
            styles={{
              width: "160px",
              height: "40px",
              borderRadius: "10px",
              backgroundColor: primaryDarked,
              color: "#fff",
              fontSize: "16px",
            }}
          >
            취소하기
          </Button>
          <Button
            _onClick={() => setIsConfirm(true)}
            styles={{
              width: "160px",
              height: "40px",
              borderRadius: "10px",
              backgroundColor: secondaryColor,
              color: "#fff",
              fontSize: "16px",
            }}
            _disabled={name || stateMsg}
          >
            수정하기
          </Button>
        </Flex>
      </Flex>
      {isConfirm ? (
        <Modal close={() => setIsConfirm(false)}>
          <Confirm
            _positive={() => {
              // 프로필 변경
              userUpdate();
            }}
            _close={() => setIsConfirm(false)}
            message="정말로 변경하시겠습니까?"
          ></Confirm>
        </Modal>
      ) : null}
      {isDelete ? (
        <Modal close={() => setIsDelete(false)}>
          <Confirm
            _positive={() => {
              // 회원탈퇴
              userDelete();
            }}
            _close={() => setIsDelete(false)}
            message="정말로 탈퇴하시겠습니까?"
          ></Confirm>
        </Modal>
      ) : null}
    </>
  );
};

export default UserUpdate;
