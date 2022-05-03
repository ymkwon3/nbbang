import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPostList } from "../../components/Data";
import {
  getAPI,
  postAPI,
  deleteAPI,
  postFormAPI,
  putAPI,
} from "../../shared/api";
import { getToken, setToken, removeToken } from "../../shared/localStorage";
// import UserCardInfo from "../../components/Data";

// console.log(UserCardInfo)
const setCardDB = createAsyncThunk(
    "/card/add", // 액션 이름을 정의
    async () => { //비동기 호출 함수를 정의
        
        return await getPostList();
        
    }
);

// reducer
const cardSlice = createSlice({
    name: "card",
    initialState: {
        postList: []
    },
    reducers: {
    },
    extraReducers: builder => {
      builder.addCase(setCardDB.fulfilled, (state, action) => {
        state.postList = action.payload;
      });
    },
  });

export default cardSlice.reducer;

// return Action Creators to export
const actionCreator = {
    setCardDB
  };
  
  export { actionCreator };