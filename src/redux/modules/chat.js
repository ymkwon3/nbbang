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

const startChatDB = createAsyncThunk("chat/startChat", async (postId) => {
  return getAPI(`/main/getchat/${postId}`).then((res) => {
    console.log(res);
    return res;
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
  room: {
    postId: "string",
    roomId: "string",
    chatAdmin: "string",
    users: [],
  },
  messages: [],
};

const initialUserFrom = {
  userId: "",
  userEmail: "",
  userName: "",
  userImage: "",
  tradeCount: "",
};

const initialMessageForm = {
  postId: "string",
  roomId: "string",
  messageId: "string",
  sender: {
    ...initialUserFrom,
  },
  content: "string",
  createdAt: "string",
};

// actions, action creators, reducers
const userSlice = createSlice({
  name: "chat",
  initialState: chatMockData,
  reducers: {
    // logout(state, action) {
    //   state = initialState;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(startChatDB.fulfilled, (state, action) => {
      console.log(state);
      console.log(action.payload);
      // add something when testing.
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
