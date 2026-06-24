import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method.toUpperCase()} request to: ${config.url}`);
    console.log('📝 Full URL:', `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from ${response.config.url}:`, response.status);
    console.log('📊 Data received:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.message);
    if (error.code === 'ECONNABORTED') {
      console.error('⏰ Request timeout - server might be down');
    }
    if (error.response) {
      console.error('Server responded with:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received from server');
      console.error('Check if backend is running on port 5000');
    }
    return Promise.reject(error);
  }
);

export const interviewService = {
  getQuestions: async () => {
    try {
      console.log('📥 Fetching interview questions from server...');
      const response = await axiosInstance.get('/interview/questions');
      console.log(`📊 Received ${response.data.questions?.length || 0} questions`);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to fetch questions:', error.message);
      throw error;
    }
  },

  getQuestionsByCategory: async (category) => {
    try {
      console.log(`📥 Fetching ${category} questions...`);
      const response = await axiosInstance.get(`/interview/questions/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Failed to fetch ${category} questions:`, error.message);
      throw error;
    }
  },

  getQuestionById: async (id) => {
    try {
      console.log(`📥 Fetching question with ID: ${id}`);
      const response = await axiosInstance.get(`/interview/questions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Failed to fetch question:`, error.message);
      throw error;
    }
  },

  createQuestion: async (questionData) => {
    try {
      console.log('📤 Creating new question...');
      const response = await axiosInstance.post('/interview/questions', questionData);
      console.log('✅ Question created successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Failed to create question:', error.message);
      throw error;
    }
  },

  updateQuestion: async (id, questionData) => {
    try {
      console.log(`📤 Updating question ${id}...`);
      const response = await axiosInstance.put(`/interview/questions/${id}`, questionData);
      console.log('✅ Question updated successfully');
      return response.data;
    } catch (error) {
      console.error(`❌ Failed to update question:`, error.message);
      throw error;
    }
  },

  deleteQuestion: async (id) => {
    try {
      console.log(`🗑️  Deleting question ${id}...`);
      const response = await axiosInstance.delete(`/interview/questions/${id}`);
      console.log('✅ Question deleted successfully');
      return response.data;
    } catch (error) {
      console.error(`❌ Failed to delete question:`, error.message);
      throw error;
    }
  }
};

export default interviewService;