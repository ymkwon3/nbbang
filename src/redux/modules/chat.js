import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAPI,
  postAPI,
  deleteAPI,
  postFormAPI,
  putAPI,
} from "../../shared/api";
import { getToken, setToken, removeToken } from "../../shared/localStorage";
import { chatMockData } from "../chatMockData";
import moment from "moment";

const startChatDB = createAsyncThunk("chat/startChat", async (postid) => {
  return getAPI(`/main/getchat/${postid}`).then((res) => {
    console.log(res.data);
    return res.data;
  });
});

const getParticipantsDB = createAsyncThunk(
  "chat/addDealParticipant",
  async (postId) => {
    // in data, {postId} must be put in.
    return getAPI(`/main/deal/getparticipantlist/${postId}`).then((res) => {
      console.log(res);
      return res;
    });
  }
);

// initialState
const initialState = {
  chatAdmin: "",
  userInfo: [],
  chatInfo: [],
};

const initialUserFrom = {
  Post_postId: "",
  Room_roomId: "",
  User_userEmail: "",
  User_userId: "",
  User_userName: "",
  chat: "",
  chatId: "",
  createdAt: "",
  userImage: "",
};

const initialMessageForm = {
  postId: "",
  roomId: "",
  messageId: "",
  sender: {
    ...initialUserFrom,
  },
  content: "",
  createdAt: "",
};

// actions, action creators, reducers
const userSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // logout(state, action) {
    //   state = initialState;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(startChatDB.fulfilled, (state, action) => {
      // console.log(state);
      // console.log(action.payload);
      // console.log(action.payload.chatAdmin[0].User_userId);
      state.chatAdmin = action.payload.chatAdmin[0].User_userId;
      state.userInfo = action.payload.userInfo;
      state.chatInfo = action.payload.chatInfo;
    });

    builder.addCase(getParticipantsDB.fulfilled, (state, action) => {
      // add something when testing.
    });
  },
});

const { actions, reducer } = userSlice;

export default reducer;

// return Action Creators to export
const actionCreator = {
  startChatDB,
};

export { actionCreator, actions };
