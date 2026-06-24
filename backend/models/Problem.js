const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    enum: ['LeetCode', 'CodeChef', 'Codeforces', 'HackerRank', 'Other'],
    default: 'LeetCode'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  link: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  },
  solvedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Problem', problemSchema);