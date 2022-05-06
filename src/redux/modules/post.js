import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAPI,
  postAPI,
  deleteAPI,
  postFormAPI,
  putAPI,
} from "../../shared/api";
import { getToken, setToken, removeToken } from "../../shared/localStorage";
import { getPostList } from "../../components/Data";

const getPostListDB = createAsyncThunk(`post/getlist`, async (data) => {
  return await postAPI('/main/postlist', data)
});

const getPostDetailDB = createAsyncThunk(`post/detail`, async (postId) => {
  return await getAPI(`/main/${postId}`).then(res => {
    return res.data;
  });
})

const addPostDB = createAsyncThunk("post/add", async (data) => {
  return await postFormAPI('/main/postadd', data);
});

/*postlist : {
  User_userId: "number",
  address: "string",
  category: "string",
  content: "string",
  createdAt: "Date",
  endTime: "Date",
  headCount: "number",
  image: "string",
  isDone: "bool",
  lat: "string",
  lng: "string",
  postId: "number",
  price: "number",
  title: "string",
  writer: "string",
}*/ 

// reducer
const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
    postDetail: [],
    category: "all"
  },
  reducers: {
    updateCategory(state, action) {
      state.category = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(addPostDB.fulfilled, (state, action) => {
      state.postList.unshift(action.payload.row[0]);
    });
    builder.addCase(getPostListDB.fulfilled, (state, action) => {
      state.postList = action.payload.data;
    });
    builder.addCase(getPostDetailDB.fulfilled, (state, action) => {
      state.postDetail = action.payload;
      
    })
  },
});

export default postSlice.reducer;

// return Action Creators to export
const actionCreator = {
  getPostListDB,
  addPostDB,
  getPostDetailDB,
  ...postSlice.actions,
};

export { actionCreator };
