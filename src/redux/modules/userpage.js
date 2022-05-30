import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAPI, postFormAPI } from "../../shared/api";

const getUserPageDB = createAsyncThunk("user/userId", async data => {
  const { userId } = data;
  return await getAPI(`/user/${userId}`, data).then(res => {
    return res;
  });
});

const setUserDB = createAsyncThunk("user/add", async data => {
  return await postFormAPI("/user/me", data);
});

const initialState = {
  userInfo: {
    userId: "",
    userEmail: "",
    userName: "",
    userImage: "",
    tradeCount: "",
    statusMsg: "",
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
    builder.addCase(setUserDB.fulfilled, (state, action) => {
      const { statusMsg, userImage, userName } = action.payload;
      state.userInfo = { ...state.userInfo, statusMsg, userImage, userName };
    });
  },
});

export default userpageSlice.reducer;

// return Action Creators to export
const actionCreator = {
  getUserPageDB,
  setUserDB,
  ...userpageSlice.actions,
};

export { actionCreator };
