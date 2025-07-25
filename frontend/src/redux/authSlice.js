import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/api';

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.signup(userData);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.login(credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;