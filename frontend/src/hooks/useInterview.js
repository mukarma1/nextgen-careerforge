import { useState, useEffect, useCallback } from 'react';
import interviewService from '../services/interviewService';
import toast from 'react-hot-toast';

export const useInterview = () => {
  const [questions, setQuestions]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    categories: [], difficulties: [], companies: [], roles: []
  });
  const [filters, setFilters] = useState({
    category: '', difficulty: '', company: '', search: ''
  });
  const [pagination, setPagination] = useState({
    current: 1, pages: 1, total: 0, limit: 10
  });

  // Fetch filter options once on mount
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await interviewService.getFilters();
        if (res.success) setFilterOptions(res.data);
      } catch (err) {
        console.error('Failed to load filter options:', err.message);
      }
    };
    loadFilters();
  }, []);

  // Fetch questions whenever filters change
  const fetchQuestions = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit: 10, ...filters };
      // Remove empty filters
      Object.keys(params).forEach(k => !params[k] && delete params[k]);

      const res = await interviewService.getQuestions(params);
      if (res.success) {
        setQuestions(res.data.questions);
        setPagination(res.data.pagination);
      } else {
        setError(res.message || 'Failed to load questions');
      }
    } catch (err) {
      // Give a friendly message based on error type
      if (err.code === 'ERR_NETWORK' || err.message?.includes('ECONNREFUSED')) {
        setError('Cannot connect to server. Make sure the backend is running on port 5000.');
      } else if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else {
        setError(err.response?.data?.message || err.message || 'Unknown error');
      }
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchQuestions(1);
  }, [fetchQuestions]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ category: '', difficulty: '', company: '', search: '' });
  }, []);

  const toggleBookmark = useCallback(async (questionId) => {
    try {
      const res = await interviewService.toggleBookmark(questionId);
      if (res.success) {
        setQuestions(prev =>
          prev.map(q =>
            q._id === questionId
              ? { ...q, isBookmarked: res.data.isBookmarked }
              : q
          )
        );
        toast.success(res.data.isBookmarked ? 'Bookmarked!' : 'Bookmark removed');
      }
    } catch (err) {
      toast.error('Failed to update bookmark');
    }
  }, []);

  const deleteQuestion = useCallback(async (questionId) => {
    try {
      const res = await interviewService.deleteQuestion(questionId);
      if (res.success) {
        setQuestions(prev => prev.filter(q => q._id !== questionId));
        setPagination(prev => ({ ...prev, total: prev.total - 1 }));
        toast.success('Question deleted');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete question');
    }
  }, []);

  return {
    questions,
    loading,
    error,
    pagination,
    filters,
    filterOptions,
    updateFilters,
    clearFilters,
    fetchQuestions,
    toggleBookmark,
    deleteQuestion
  };
};