import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../services/authService";
import blogsService from "../services/blogsService";

const initialState = {
  author: null,
  authorBlogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Fetch Author
export const fetchAuthor = createAsyncThunk(
  "auth/fetchAuthor",
  async (userData, thunkAPI) => {
    try {
      return await authService.getUser(userData);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchBlogsByAuthorId = createAsyncThunk(
  "blogs/fetchBlogsByAuthorId",
  async (authorId, thunkAPI) => {
    try {
      return await blogsService.getBlogsByAuthorId(authorId);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetSuccessAndError: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAuthor.fulfilled, (state, { payload }) => {
        state.author = payload.data;
        state.isLoading = false;
        // state.isSuccess = true;
        state.isError = false;
        // state.message = payload.message;
      })
      .addCase(fetchAuthor.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(fetchBlogsByAuthorId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogsByAuthorId.fulfilled, (state, { payload }) => {
        state.authorBlogs = payload.data;
        state.isLoading = false;
        // state.isSuccess = true;
        state.isError = false;
        // state.message = payload.message;
      })
      .addCase(fetchBlogsByAuthorId.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      });
  },
});

export const { reset, resetSuccessAndError } = authSlice.actions;
export default authSlice.reducer;
