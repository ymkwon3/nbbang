import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAPI,
  postAPI,
  deleteAPI,
  postFormAPI,
  putAPI,
} from "../../shared/api";
import { getToken, setToken, removeToken } from "../../shared/localStorage";
import moment from "moment";

// initialState
const initialState = {
  list: [],
};

const initialEachElementForm = {
  type: "",
  content: "",
};

// actions, action creators, reducers
const notificationSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getNotification: (state, action) => {
      //   console.log(action.payload);
      state.list = [...state.list, action.payload];
    },
  },
  extraReducers: (builder) => {},
});

const { actions, reducer } = notificationSlice;

export default reducer;

// return Action Creators to export
const actionCreator = {};

export { actionCreator, actions };
