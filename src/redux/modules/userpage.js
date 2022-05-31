import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAPI, postFormAPI, postAPI } from "../../shared/api";

const getUserPageDB = createAsyncThunk("user/userId", async (data) => {
  const { userId } = data;
  return await getAPI(`/user/${userId}`, data).then((res) => {
    return res;
  });
});

const setUserDB = createAsyncThunk("user/add", async (data) => {
  return await postFormAPI("/user/me", data);
});

const setReviewDB = createAsyncThunk("user/review", async (data) => {
  const { postId, userId, review } = data;
  const res = await postAPI(`/user/me/${postId}`, { userId, review });
  return { res, postId };
});

const getReviewListDB = createAsyncThunk(
  "user/getreviewlist",
  async (userId) => {
    const res = await getAPI(`/user/review/${userId}`);
    return res;
  }
);

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
  reviewList: [],
  reviewCount: "",
};

// reducer
const userpageSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
    builder.addCase(setReviewDB.fulfilled, (state, action) => {
      const { postId } = action.payload;
      state.joinList = state.joinList.map((v) => {
        if (v.postId === postId) v.needReview = 0;
        return v;
      });
    });
    builder.addCase(getReviewListDB.fulfilled, (state, action) => {
      if (action.payload.msg === "success") {
        state.reviewList = action.payload.review;
        state.reviewCount = action.payload.count;
      }
    });
  },
});

export default userpageSlice.reducer;

// return Action Creators to export
const actionCreator = {
  getUserPageDB,
  setUserDB,
  setReviewDB,
  ...userpageSlice.actions,
  getReviewListDB,
};

export { actionCreator };
