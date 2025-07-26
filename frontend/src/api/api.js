import axios from 'axios';

const API_URL = 'https://zi-project-1-2.onrender.com/api';

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

// Admin endpoints
export const getAdminStats = () => api.get('/admin/stats');
export const getAllUsers = () => api.get('/admin/users');
export const addUser = (userData) => api.post('/admin/users', userData);
export const toggleBlockUser = (id) => api.patch(`/admin/users/${id}/toggle-block`);
export const deleteUserById = (id) => api.delete(`/admin/users/${id}`);
export const resetUserPassword = (id, password) => api.post(`/admin/users/${id}/reset-password`, { password });
export const getUserUploads = (id) => api.get(`/admin/users/${id}/uploads`);
export const getAllUploads = () => api.get('/admin/uploads');

// User Profile endpoints
export const getUserProfile = () => api.get('/users/profile');
export const updateUserProfile = (userData) => api.put('/users/profile', userData);
export const changePassword = (passwordData) => api.put('/users/change-password', passwordData);

export default api;