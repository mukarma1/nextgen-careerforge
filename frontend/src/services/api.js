import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (userData) => api.post('/auth/register', userData);
export const login = (userData) => api.post('/auth/login', userData);
export const getProfile = () => api.get('/auth/profile');

// DSA APIs (will create later)
export const addProblem = (data) => api.post('/dsa/problems', data);
export const getProblems = () => api.get('/dsa/problems');


// Resume APIs
export const uploadResume = (formData) =>
  api.post('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const getMyResumes = () =>
  api.get('/resume/my-resumes');

export const getResumeById = (id) =>
  api.get(`/resume/${id}`);

export const deleteResume = (id) =>
  api.delete(`/resume/${id}`);

export default api;