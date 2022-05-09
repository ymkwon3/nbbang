import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAPI,
  postAPI,
  deleteAPI,
  postFormAPI,
  putAPI,
} from "../../shared/api";
import { getToken, setToken, removeToken } from "../../shared/localStorage";

const getUserPageDB = createAsyncThunk("user/userId", async data => {
  const { userId } = data;
  return await getAPI(`/user/${userId}`, data).then(res => {
    return res
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
  myList: [],
  joinList: [],
  likeList: [],
};

// reducer
const userpageSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserPageDB.fulfilled, (state, action) => {
      state.userInfo = action.payload.userInfo[0];
      state.myList = action.payload.myList;
      state.joinList = action.payload.joinList;
      state.likeList = action.payload.likeList;
    });
  },
});

export default userpageSlice.reducer;

// return Action Creators to export
const actionCreator = {
  getUserPageDB,
  ...userpageSlice.actions,
};

export { actionCreator };
