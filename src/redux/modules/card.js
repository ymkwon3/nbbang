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

const setCardDB = createAsyncThunk("card/add", async () => {
  return await getPostList();
});

// reducer
const cardSlice = createSlice({
  name: "card",
  initialState: {
    postList: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setCardDB.fulfilled, (state, action) => {
      state.postList = action.payload;
    });
  },
});

export default cardSlice.reducer;

// return Action Creators to export
const actionCreator = {
  setCardDB,
};

export { actionCreator };
