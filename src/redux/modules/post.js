import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAPI,
  postAPI,
  deleteAPI,
  postFormAPI,
  putAPI,
} from "../../shared/api";
import { getToken, setToken, removeToken } from "../../shared/localStorage";

const setPostDB = createAsyncThunk("post/add", async ({ data }) => {
  return await data;
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
      console.log(action.meta.arg);
      state.postList.push(action.meta.arg);
    });
  },
});

export default postSlice.reducer;

// return Action Creators to export
const actionCreator = {
  setPostDB
};

export { actionCreator };
