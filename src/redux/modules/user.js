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

// reducer
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      userId: "",
      userEmail: "",
      userName: "",
      userImage: "",
      tradeCount: "",
    },
    isLogin: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginDB.fulfilled, (state, action) => {
      console.log(action.payload);
      state.userInfo = action.payload;
      state.isLogin = true;
    });
  },
});

export default userSlice.reducer;

// return Action Creators to export
const actionCreator = {
  loginDB,
  signUpDB,
};

export { actionCreator };
