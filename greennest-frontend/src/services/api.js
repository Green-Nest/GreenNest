import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Ensure proper Bearer token format
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add debug logging for admin requests
    if (config.url?.includes('/admin/')) {
      console.log('🔐 Admin API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        hasToken: !!token,
        token: token?.substring(0, 20) + '...' // Log first 20 chars for debugging
      });
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Log successful admin responses
    if (response.config.url?.includes('/admin/')) {
      console.log('✅ Admin API Success:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    const isAdminRequest = error.config?.url?.includes('/admin/');
    
    console.error('❌ API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      isAdmin: isAdminRequest,
      message: error.response?.data?.message,
      data: error.response?.data
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      if (isAdminRequest) {
        toast.error('Access denied. Admin privileges required for this action.');
        // Don't redirect, just show error
      } else {
        toast.error('Access denied. You need proper privileges for this action.');
      }
    } else if (error.response?.status === 404) {
      toast.error('API endpoint not found. Please check if the backend is running.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please check your connection.');
    } else {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
    return Promise.reject(error);
  }
);

export default api;
