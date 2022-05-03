import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAPI,
  postAPI,
  deleteAPI,
  postFormAPI,
  putAPI,
} from "../../shared/api";
import { getToken, setToken, removeToken } from "../../shared/localStorage";
import {getPostList} from "../../components/Data";

const setPostDB = createAsyncThunk("post/add", async () => {
  return await getPostList();
});

// reducer
const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setPostDB.fulfilled, (state, action) => {
      state.postList = action.payload;
    });
  },
});

export default postSlice.reducer;

// return Action Creators to export
const actionCreator = {
  setPostDB
};

export { actionCreator };
