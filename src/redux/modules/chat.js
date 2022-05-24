import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAPI } from "../../shared/api";

const startChatDB = createAsyncThunk("chat/startChat", async (postid) => {
  return getAPI(`/main/getchat/${postid}`).then((res) => {
    return res.data;
  });
});

// initialState
const initialState = {
  chatAdmin: "",
  userInfo: [],
  chatInfo: [],
  headList: [],
  isLoading: false,
};

// actions, action creators, reducers
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startChatDB.fulfilled, (state, action) => {
      state.chatAdmin = action.payload.chatAdmin[0].User_userId;
      state.userInfo = action.payload.userInfo;
      state.chatInfo = action.payload.chatInfo;
      state.headList = action.payload.headList;
    });
  },
});

const { actions, reducer } = chatSlice;

export default reducer;

// return Action Creators to export
const actionCreator = {
  startChatDB,
};

export { actionCreator, actions };
