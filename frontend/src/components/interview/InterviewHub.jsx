import React, { useState } from 'react';
import { useInterview } from '../../hooks/useInterview';
import QuestionCard from './QuestionCard';
import FilterSidebar from './FilterSidebar';
import SearchBar from './SearchBar';
import CreateQuestionForm from './CreateQuestionForm';   // ← WAS MISSING
import QuestionModal from './QuestionModal';             // ← WAS MISSING
import { FiPlus, FiFilter, FiLoader, FiAlertCircle, FiBookmark } from 'react-icons/fi';

const InterviewHub = () => {
  const {
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
  } = useInterview();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const displayedQuestions = showBookmarkedOnly
    ? questions.filter(q => q.isBookmarked)
    : questions;

  const handleSearch = (e) => {
    updateFilters({ search: e.target.value });
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      await deleteQuestion(questionId);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <FiLoader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400 mb-2 font-semibold">Failed to load questions</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{error}</p>
          <button
            onClick={() => fetchQuestions(1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Interview Preparation Hub
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {pagination?.total ?? 0} questions to help you ace your interview
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <FiPlus className="w-5 h-5" />
              Add Question
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            updateFilters={updateFilters}
            clearFilters={clearFilters}
            filterOptions={filterOptions}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />

          <div className="flex-1 min-w-0">
            {/* Search and Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <SearchBar
                  value={filters?.search ?? ''}
                  onChange={handleSearch}
                  placeholder="Search questions, answers, or tags..."
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiFilter className="w-5 h-5" />
                  Filters
                  {(filters?.category || filters?.difficulty || filters?.company) && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    showBookmarkedOnly
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiBookmark className="w-5 h-5" />
                  Bookmarks
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {(filters?.category || filters?.difficulty || filters?.company) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                {filters.category && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                    {filters.category}
                    <button onClick={() => updateFilters({ category: '' })}>×</button>
                  </span>
                )}
                {filters.difficulty && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                    {filters.difficulty}
                    <button onClick={() => updateFilters({ difficulty: '' })}>×</button>
                  </span>
                )}
                {filters.company && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                    {filters.company}
                    <button onClick={() => updateFilters({ company: '' })}>×</button>
                  </span>
                )}
              </div>
            )}

            {/* Questions Grid */}
            {displayedQuestions.length === 0 ? (
              <div className="text-center py-12">
                <FiBookmark className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No questions found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {showBookmarkedOnly
                    ? "You haven't bookmarked any questions yet."
                    : "Try adjusting your filters or add a new question."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {displayedQuestions.map(question => (
                  <QuestionCard
                    key={question._id}
                    question={question}
                    onBookmark={toggleBookmark}
                    onDelete={handleDeleteQuestion}
                    onView={setSelectedQuestion}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination?.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => fetchQuestions(pagination.current - 1)}
                  disabled={pagination.current === 1}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
                {[...Array(pagination.pages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => fetchQuestions(i + 1)}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      pagination.current === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => fetchQuestions(pagination.current + 1)}
                  disabled={pagination.current === pagination.pages}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateForm && (
        <CreateQuestionForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            setShowCreateForm(false);
            fetchQuestions(1);
          }}
        />
      )}
      {selectedQuestion && (
        <QuestionModal
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
          onBookmark={toggleBookmark}
        />
      )}
    </div>
  );
};

export default InterviewHub;