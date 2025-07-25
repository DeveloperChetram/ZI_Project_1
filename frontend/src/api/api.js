import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication endpoints
export const signup = (userData) => api.post('/auth/signup', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

// File endpoints
export const uploadFile = (formData) => api.post('/file/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const getHistory = () => api.get('/file/history');

// Chart endpoints
export const getChartData = () => api.get('/chart/data');

export default api;