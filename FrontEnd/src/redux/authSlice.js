import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config/config';
const BASE_URL = config.BASE_URL;

// Async actions for login and register
export const loginUser = createAsyncThunk('auth/login', async (userData) => {
  const response = await axios.post(`${BASE_URL}/api/auth/login`, userData,{
    withCredentials: true,
  });
  return response.data;
});

export const registerUser = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post(`${BASE_URL}/api/auth/register`, userData);
  return response.data;
});

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
