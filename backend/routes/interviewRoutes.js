const express = require('express');
const router = express.Router();
const {
  getQuestions,
  getQuestionsByCategory,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion
} = require('../controllers/interviewController');

// Get all questions
router.get('/questions', getQuestions);

// Get questions by category
router.get('/questions/category/:category', getQuestionsByCategory);

// Get single question
router.get('/questions/:id', getQuestionById);

// Create question
router.post('/questions', createQuestion);

// Update question
router.put('/questions/:id', updateQuestion);

// Delete question
router.delete('/questions/:id', deleteQuestion);

module.exports = router;