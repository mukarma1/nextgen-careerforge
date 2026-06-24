import React from 'react';
import { FiFilter, FiX, FiCheck } from 'react-icons/fi';

const FilterSidebar = ({ filters, updateFilters, clearFilters, filterOptions, isOpen, onClose }) => {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 bg-white dark:bg-gray-800 shadow-xl
        transform transition-transform duration-300 ease-in-out
        lg:transform-none lg:shadow-none lg:border-r lg:border-gray-200 lg:dark:border-gray-700
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FiFilter className="w-5 h-5" />
              Filters
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Clear all
              </button>
              <button
                onClick={onClose}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <div className="space-y-2">
              <button
                onClick={() => updateFilters({ category: '' })}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                  !filters.category
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                All Categories
              </button>
              {filterOptions.categories.map(category => (
                <button
                  key={category}
                  onClick={() => updateFilters({ category })}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                    filters.category === category
                      ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {category}
                  {filters.category === category && (
                    <FiCheck className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty
            </label>
            <div className="space-y-2">
              <button
                onClick={() => updateFilters({ difficulty: '' })}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                  !filters.difficulty
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                All Levels
              </button>
              {filterOptions.difficulties.map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => updateFilters({ difficulty })}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                    filters.difficulty === difficulty
                      ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {difficulty}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[difficulty]}`}>
                      {difficulty}
                    </span>
                  </span>
                  {filters.difficulty === difficulty && (
                    <FiCheck className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Company Filter */}
          {filterOptions.companies.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <button
                  onClick={() => updateFilters({ company: '' })}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                    !filters.company
                      ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  All Companies
                </button>
                {filterOptions.companies.map(company => (
                  <button
                    key={company}
                    onClick={() => updateFilters({ company })}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                      filters.company === company
                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {company}
                    {filters.company === company && (
                      <FiCheck className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={filters.sort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="-createdAt">Newest First</option>
              <option value="createdAt">Oldest First</option>
              <option value="-views">Most Viewed</option>
              <option value="-likes">Most Liked</option>
              <option value="question">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;