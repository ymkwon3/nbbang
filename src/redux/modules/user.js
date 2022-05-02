import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAPI,
  postAPI,
  deleteAPI,
  postFormAPI,
  putAPI,
} from "../../shared/api";
import { getToken, setToken, removeToken } from "../../shared/localStorage";

const signUpDB = createAsyncThunk("user/signUp", async data => {
  postAPI("/user/signUp", data).then(res => {
    alert("회원가입이 완료되었습니다.");
  });
});

const loginDB = createAsyncThunk("user/login", async ({ data, history }) => {
  // 실패 시 고려해야함
  return postAPI("/user/login", data).then(res => {
    setToken(res.token);
    history.replace("/");
    return res.userInfo;
  });
});

const isLoginDB = createAsyncThunk("user/isLogin", async ({ data, history }) => {
  // 실패 시 고려해야함
  return postAPI("/user/login", data).then(res => {
    return res.userInfo;
  });
});

// reducer
const initialState = {
  userInfo: {
    userId: "",
    userEmail: "",
    userName: "",
    userImage: "",
    tradeCount: "",
  },
  isLogin: false,
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state, action) {
      state = initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginDB.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.isLogin = true;
    });
    builder.addCase(loginDB.rejected, (state, action) => {
      alert("아이디 혹은 비밀번호를 확인해주세요")
    });
    builder.addCase(isLoginDB.fulfilled, (state, action) => {
      console.log(action.payload);
      state.userInfo = action.payload;
      state.isLogin = true;
    });
  },
});

const {actions, reducer} = userSlice;

export default reducer;

// return Action Creators to export
const actionCreator = {
  signUpDB,
  loginDB
};

export { actionCreator, actions };
