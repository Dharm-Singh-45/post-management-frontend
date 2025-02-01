import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const API_URL = "https://post-management-backend-zyz8.onrender.com/api/posts";


export const fetchPosts = createAsyncThunk("", async () => {
  const response = await axios.get(`${API_URL}/getallposts`);
  return response.data.posts;
});

const postSlice = createSlice({
  name: "posts",
  initialState: { posts: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
