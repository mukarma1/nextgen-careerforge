const mongoose = require('mongoose');

const interviewQuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['technical', 'behavioral', 'system-design', 'coding', 'general']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  company: {
    type: String,
    required: false
  },
  sampleAnswer: {
    type: String,
    required: false
  },
  hints: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('InterviewQuestion', interviewQuestionSchema);