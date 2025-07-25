import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/api';

export const uploadExcelFile = createAsyncThunk('file/uploadFile', async (file, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.uploadFile(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchHistory = createAsyncThunk('file/fetchHistory', async (_, { rejectWithValue }) => {
  try {
    const response = await api.getHistory();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    history: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadExcelFile.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.history = action.payload;
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

export default fileSlice.reducer;