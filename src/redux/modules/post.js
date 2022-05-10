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

const getPostListDB = createAsyncThunk(`post/getlist`, async data => {
  return await postAPI("/main/postlist", data);
});

const getPostDetailDB = createAsyncThunk(`post/detail`, async (postId) => {
  return await getAPI(`/main/${postId}`).then(res => {
    return res.data[0];
  });
})

const addPostDB = createAsyncThunk("post/add", async (data) => {
  return await postFormAPI('/main/postadd', data);
});

const postLikeDB = createAsyncThunk("post/like", async data => {
  const { postId, isLike } = data;
  if (isLike) {
    return await deleteAPI(`/main/like/${postId}`);
  } else {
    return await getAPI(`/main/like/${postId}`);
  }
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
    updateCityRange(state, action) {
      state.cityRange = action.payload;
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
    builder.addCase(postLikeDB.fulfilled, (state, action) => {
      const { postId, isLike } = action.meta.arg;
      state.postList = state.postList.map(v => {
        if (v.postId === postId) {
          return {...v, isLike: isLike ? 0 : 1}
        }
        return v;
      });
    });
  },
});

export default postSlice.reducer;

// return Action Creators to export
const actionCreator = {
  getPostListDB,
  addPostDB,
  postLikeDB,
  getPostDetailDB,
  ...postSlice.actions,
};

export { actionCreator };
