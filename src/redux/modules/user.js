import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAPI,
  postAPI,
  deleteAPI,
  postFormAPI,
  putAPI,
} from "../../shared/api";
import { getToken, setToken, removeToken } from "../../shared/localStorage";

const signUpDB = createAsyncThunk("user/signUp", async (data) => {
  postAPI("/user/signUp", data).then((res) => {
    alert("회원가입이 완료되었습니다.");
  });
});

const loginDB = createAsyncThunk("user/login", async (data) => {
  // 실패 시 고려해야함
  return await postAPI("/user/login", data).then(res => {
    if (res.msg === "fail") {
      alert("아이디 비밀번호를 확인해주세요");
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
  },
});



export default userSlice.reducer;

// return Action Creators to export
const actionCreator = {
  signUpDB,
  loginDB,
  isLoginDB,
  ...userSlice.actions,
};

export { actionCreator };
