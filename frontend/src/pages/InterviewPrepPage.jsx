import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { interviewService } from '../services/interviewService';

const InterviewPrepPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Loading questions...');
      
      const response = await interviewService.getQuestions();
      console.log('📊 Response:', response);
      
      if (response && response.success) {
        setQuestions(response.questions || []);
        if (response.questions.length === 0) {
          setError('No questions available. Please seed the database.');
        }
      } else {
        setError(response?.message || 'Failed to load questions');
      }
    } catch (err) {
      console.error('❌ Error:', err);
      setError(`Failed to load questions: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'technical', 'behavioral', 'system-design', 'coding', 'general'];

  const filteredQuestions = questions.filter(q => {
    const matchCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        q.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading interview questions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-red-800 font-semibold text-lg mb-2">⚠️ Error Loading Questions</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={loadQuestions}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            🎯 Interview Preparation
            <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
              {questions.length} Questions
            </span>
          </h1>
          <p className="text-gray-500 mt-1">Practice with real interview questions from top companies</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Questions Grid */}
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <p className="text-gray-500 text-lg">No questions found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <div 
                key={question._id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden"
              >
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50/50 transition"
                  onClick={() => toggleExpand(question._id)}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {question.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{question.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {question.difficulty}
                        </span>
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                          {question.category}
                        </span>
                      </div>
                      {question.company && (
                        <span className="text-xs text-gray-500">🏢 {question.company}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Expand/Collapse indicator */}
                  <div className="mt-3 flex items-center text-indigo-600 text-sm font-medium">
                    {expandedId === question._id ? (
                      <><FiChevronUp className="mr-1" /> Hide details</>
                    ) : (
                      <><FiChevronDown className="mr-1" /> View details</>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === question._id && (
                  <div className="px-6 pb-6 pt-0 border-t border-gray-100 bg-gray-50/50">
                    {question.hints && question.hints.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">💡 Hints:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {question.hints.map((hint, index) => (
                            <li key={index}>{hint}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {question.sampleAnswer && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">📖 Sample Answer:</p>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700">
                          {question.sampleAnswer}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Showing {filteredQuestions.length} of {questions.length} questions
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepPage;