import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAPI,
  postAPI,
  deleteAPI,
  postFormAPI,
  putAPI,
} from "../../shared/api";
import { getToken, setToken, removeToken } from "../../shared/localStorage";
import UserCardInfo from "../../components/Data";

const setCardDB = createAsyncThunk("card/add", async ({ data }) => {
  
  return await data;
});

// reducer
const cardSlice = createSlice({
  name: "card",
  initialState: {
    value: UserCardInfo,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setCardDB.fulfilled, (state, action) => {
      console.log(action.meta.arg);
      state.cardlist.push(action.meta.arg);
    });
  },
});

export default cardSlice.reducer;

// return Action Creators to export
const actionCreator = {
  setCardDB,
};

export { actionCreator };
