/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import { RootState } from '../store';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (form: { username: string; password: string }) => {
    try {
      const response = await api.login(form);

      const { access_token } = response.data;

      document.cookie = `access_token=${access_token}`;

      return response.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/',
  async (_, { getState }) => {
    try {
      const state = getState() as RootState;

      if (state.auth.attempttedCurrentUser) {
        return state.auth.user;
      }

      const response = await api.getCurrentUser();
      return response.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await api.logout();

    document.cookie =
      'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    return Promise.resolve();
  } catch (error: any) {
    return Promise.reject(error.response.data);
  }
});

export const registerUser = createAsyncThunk(
  'auth/signup',
  async (form: {
    username: string;
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      const response = await api.register(form);

      const { access_token } = response.data;

      document.cookie = `access_token=${access_token}`;

      return response.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  }
);

// Define initial state
const initialState = {
  user: null,
  loading: false,
  error: '',
  attempttedCurrentUser: false,
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
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.attempttedCurrentUser = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.attempttedCurrentUser = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to logout. Please try again.';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to register. Please try again.';
      });
  },
});

export default authSlice.reducer;
