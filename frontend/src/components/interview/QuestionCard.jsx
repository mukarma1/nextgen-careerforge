import React, { useState } from 'react';
import { 
  FiBookmark, 
  FiEye, 
  FiThumbsUp, 
  FiTrash2, 
  FiEdit2,
  FiChevronDown,
  FiChevronUp,
  FiUser
} from 'react-icons/fi';

const QuestionCard = ({ question, onBookmark, onDelete, onEdit, onView }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  const categoryColors = {
    Technical: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Behavioral: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    HR: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    'System Design': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    Coding: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'Data Structures': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    Algorithms: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[question.category] || 'bg-gray-100 text-gray-800'}`}>
                {question.category}
              </span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColors[question.difficulty]}`}>
                {question.difficulty}
              </span>
            </div>
            <h3 
              className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => onView?.(question)}
            >
              {question.question}
            </h3>
          </div>
        </div>

        {/* Company & Role */}
        {(question.company || question.role) && (
          <div className="flex items-center gap-3 mb-3 text-sm text-gray-600 dark:text-gray-400">
            {question.company && (
              <span className="flex items-center gap-1">
                🏢 {question.company}
              </span>
            )}
            {question.role && (
              <span className="flex items-center gap-1">
                💼 {question.role}
              </span>
            )}
          </div>
        )}

        {/* Answer Preview */}
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {isExpanded ? question.answer : truncateText(question.answer)}
          </p>
          {question.answer.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1"
            >
              {isExpanded ? (
                <>Show less <FiChevronUp className="w-4 h-4" /></>
              ) : (
                <>Show more <FiChevronDown className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>

        {/* Tags */}
        {question.tags && question.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <FiEye className="w-4 h-4" />
              {question.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <FiThumbsUp className="w-4 h-4" />
              {question.likes || 0}
            </span>
            {question.createdBy && (
              <span className="flex items-center gap-1">
                <FiUser className="w-4 h-4" />
                {question.createdBy.name}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Edit Button */}
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(question);
                }}
                className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                title="Edit"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
            )}

            {/* Delete Button */}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(question._id);
                }}
                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                title="Delete"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            )}

            {/* Bookmark Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark(question._id);
              }}
              className={`p-2 rounded-lg transition-all ${
                question.isBookmarked
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                  : 'text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
              }`}
              title={question.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <FiBookmark
                className="w-4 h-4"
                fill={question.isBookmarked ? 'currentColor' : 'none'}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;