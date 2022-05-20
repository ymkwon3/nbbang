import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAPI,
  postAPI,
  postFormAPI,
} from "../../shared/api";
import { setToken, removeToken } from "../../shared/localStorage";
import { notify } from "../../components/ToastMessage";

const signUpDB = createAsyncThunk("user/signUp", async (data) => {
  postAPI("/user/signUp", data).then((res) => {
    notify("success", "회원가입이 완료되었습니다.", 1500)
  });
});

const loginDB = createAsyncThunk("user/login", async (data) => {
  // 실패 시 고려해야함
  return await postAPI("/user/login", data).then(res => {
    if (res.msg === "fail") {
      notify("warning", "아이디 비밀번호를 확인해주세요", 1500)
      return null;
    } else {
      setToken(res.token);
      return res.userInfo;
    }
  });
});

const isLoginDB = createAsyncThunk(
  "user/islogin",
  async () => {
    // 실패 시 고려해야함
    return await getAPI("/user/islogin").then(res => {
      return res.userInfo;
    });
  }
);

const kakaoLogin = createAsyncThunk(
  "user/kakaologin",
  async (code) => {
    return await getAPI(`/kakao-auth/kakao/callback?code=${code}`).then(res => {
      console.log(res)
    });
  }
);

const postUserImageDB = createAsyncThunk("user/me", async formData => {
  return await postFormAPI(`/user/me`, formData).then(res => {
    return res;
  });
});

const initialState = {
  userInfo: {
    userId: "",
    userEmail: "",
    userName: "",
    userImage: "",
    tradeCount: "",
  },
  isLogin: false,
};

// reducer
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state, action) {
      state.userInfo = initialState.userInfo;
      state.isLogin = initialState.isLogin;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginDB.fulfilled, (state, action) => {
      if (action.payload) {
        state.userInfo = action.payload;
        state.isLogin = true;
      }
    });
    builder.addCase(isLoginDB.fulfilled, (state, action) => {
      if (action.payload) {
        state.userInfo = action.payload;
        state.isLogin = true;
      }
    });
    builder.addCase(postUserImageDB.fulfilled, (state, action) => {
      state.userInfo.userImage = action.payload.userImage;
    });
  },
});



export default userSlice.reducer;

// return Action Creators to export
const actionCreator = {
  signUpDB,
  loginDB,
  isLoginDB,
  postUserImageDB,
  kakaoLogin,
  ...userSlice.actions,
};

export { actionCreator };
