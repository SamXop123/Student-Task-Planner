import axios from 'axios';
import { auth } from '../config/firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Error getting Firebase token:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.userMessage = 'Network error. Please check your connection.';
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    switch (status) {
      case 400:
        error.userMessage = data?.error || 'Invalid request. Please check your input.';
        break;
      case 401:
        error.userMessage = data?.error || 'Session expired. Please log in again.';
        break;
      case 403:
        error.userMessage = 'You do not have permission to perform this action.';
        break;
      case 404:
        error.userMessage = data?.error || 'Resource not found.';
        break;
      case 500:
        error.userMessage = 'Server error. Please try again later.';
        break;
      default:
        error.userMessage = data?.error || 'Something went wrong.';
    }

    return Promise.reject(error);
  }
);


export const taskService = {

  getTasks: async (params = {}) => {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },


  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },


  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },


  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default api;
