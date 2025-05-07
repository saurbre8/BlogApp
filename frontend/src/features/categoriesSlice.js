import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import categoryService from "../services/categoryService";

const initialState = {
  addCategory: null,
  editCategory: null,
  deleteCategory: null,
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (category, thunkAPI) => {
    try {
      return await categoryService.createCategory(category);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategories();
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCategoryById = createAsyncThunk(
  "categories/updateCategoryById",
  async (category, thunkAPI) => {
    try {
      return await categoryService.updateCategory(category);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCategoryById = createAsyncThunk(
  "categories/deleteCategoryById",
  async (category, thunkAPI) => {
    try {
      return await categoryService.deleteCategory(category);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetSuccessAndError: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setAddCategory: (state, { payload }) => {
      state.addCategory = payload;
      state.editCategory = null;
      state.deleteCategory = null;
    },
    setEditCategory: (state, { payload }) => {
      state.editCategory = payload;
      state.addCategory = null;
      state.deleteCategory = null;
    },
    setDeleteCategory: (state, { payload }) => {
      state.deleteCategory = payload;
      state.addCategory = null;
      state.editCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.categories.push(payload.data);
        state.isSuccess = true;
        state.isLoading = false;
        state.message = payload.message;
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.message = payload;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload.data;
        // state.isSuccess = true;
        state.isLoading = false;
        // state.message = payload.message;
      })
      .addCase(fetchCategories.rejected, (state, { payload }) => {
        state.message = payload;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(updateCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategoryById.fulfilled, (state, { payload }) => {
        const index = state.categories.findIndex(
          (x) => x.id === payload.data.id
        );
        state.categories = state.categories.filter(
          (x) => x.id !== payload.data.id
        );
        state.categories.splice(index, 0, payload.data);
        state.editCategory = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload.message;
      })
      .addCase(updateCategoryById.rejected, (state, { payload }) => {
        state.message = payload;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(deleteCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategoryById.fulfilled, (state, { payload }) => {
        state.categories = state.categories.filter(
          (x) => x.id !== payload.data.id
        );
        state.deleteCategory = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(deleteCategoryById.rejected, (state, { payload }) => {
        state.message = payload;
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const {
  reset,
  resetSuccessAndError,
  setAddCategory,
  setEditCategory,
  setDeleteCategory,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
