/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (form: { username: string; password: string }) => {
    try {
      const response = await api.login(form);

      const { access_token } = response.data;

      document.cookie = `access_token=${access_token}`;

      return response.data;
    } catch (error: any) {
      // reject the promise returned from the thunk
      return Promise.reject(error.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk('auth/', async () => {
  try {
    const response = await api.getCurrentUser();
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response.data);
  }
});

// Define initial state
const initialState = {
  user: null,
  loading: false,
  error: '',
};

// Define the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Invalid credentials. Please try again.';
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
