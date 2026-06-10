const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  originalName: String,
  uploadDate: {
    type: Date,
    default: Date.now
  },
  analysis: {
    score: {
      type: Number,
      default: 0
    },
    skills: [String],
    experience: [String],
    education: [String],
    missingSkills: [String],
    suggestions: [String],
    sections: {
      contact: Boolean,
      summary: Boolean,
      experience: Boolean,
      education: Boolean,
      skills: Boolean,
      projects: Boolean
    }
  },
  rawText: String,
  filePath: String
});

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;