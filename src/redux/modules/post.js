import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAPI,
  postAPI,
  putAPI,
  deleteAPI,
  postFormAPI,
} from "../../shared/api";

const getPostListDB = createAsyncThunk(`post/getlist`, async data => {
  return await postAPI("/main/postlist", data);
});

const getPostDetailDB = createAsyncThunk(`post/detail`, async (postId) => {
  return await getAPI(`/main/${postId}`).then(res => {
    return res.data[0];
  });
});

const addPostDB = createAsyncThunk("post/add", async (data) => {
  return await postFormAPI('/main/postadd', data);
});

const deletePostDB = createAsyncThunk("post/delete", async (postId) => {
  return await deleteAPI(`/main/${postId}`).then(() => {
    return postId
  });
});

const completePostDB = createAsyncThunk("post/complete", async (postId) => {
  return await putAPI(`/main/${postId}`).then(() => {
    return postId
  });
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
    postDetail: {},
    postSearch: "",
    category: "all",
    isLoading: false,
  },
  reducers: {
    updateCategory(state, action) {
      state.category = action.payload;
    },
    updateCityRange(state, action) {
      state.cityRange = action.payload;
    },
    searchPost(state,action) {
      state.postSearch = action.payload;
    },
    isLoading(state,action){
      state.isLoading = action.payload;
    },
    updateLastPostList(state, action) {
      state.postList = state.postList.sort(function(a,b) {
        return a.createdAt.substr(0,19).replace(/-/gi, "").replace('T', "").replace(/:/gi, "") < b.createdAt.substr(0,19).replace(/-/gi, "").replace('T', "").replace(/:/gi, "") 
        ? 1 : a.createdAt.substr(0,19).replace(/-/gi, "").replace('T', "").replace(/:/gi, "") > b.createdAt.substr(0,19).replace(/-/gi, "").replace('T', "").replace(/:/gi, "")
        ? -1 : 0;
      })
    },
    updateLikePostList(state, action) {
      state.postList = state.postList.sort((a,b) => (a.isLike===0) - (b.isLike===0) || a-b)
    },
    updateEndPostList(state, action) {
      state.postList = state.postList.sort(function(a,b) {
        return a.endTime.substr(0,19).replace(/-/gi, "").replace('T', "").replace(/:/gi, "") < b.endTime.substr(0,19).replace(/-/gi, "").replace('T', "").replace(/:/gi, "") 
        ? -1 : a.endTime.substr(0,19).replace(/-/gi, "").replace('T', "").replace(/:/gi, "") > b.endTime.substr(0,19).replace(/-/gi, "").replace('T', "").replace(/:/gi, "")
        ? 1 : 0;
      })
    }
  },
  extraReducers: builder => {
    builder.addCase(addPostDB.fulfilled, (state, action) => {
      state.postList.unshift(action.payload.row[0]);
    });
    builder.addCase(getPostListDB.fulfilled, (state, action) => {
      state.postList = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getPostDetailDB.fulfilled, (state, action) => {
      state.postDetail = action.payload;
    });
    builder.addCase(deletePostDB.fulfilled, (state, action) => {
      state.postList = state.postList.filter(v => v.postId !== action.payload )
    });
    builder.addCase(completePostDB.fulfilled, (state, action) => {
      state.postList = state.postList.filter(v => v.postId !== action.payload )
    });
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
  deletePostDB,
  completePostDB,
  ...postSlice.actions,
};

export { actionCreator };
