const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Resume = require('../models/Resume');
const jwt = require('jsonwebtoken');
const { analyzeResume } = require('../services/resumeAnalyzer');

const router = express.Router();

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Multer configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Simple PDF Text Extractor (No external library needed!)
function extractTextFromPDFBuffer(buffer) {
  const text = buffer.toString('utf-8');
  
  // Remove PDF binary characters and extract readable text
  let cleaned = text
    .replace(/[^\x20-\x7E\x0A\x0D\u00A0-\u00FF]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Try to find text between stream/endstream or BT/ET blocks
  const btMatches = cleaned.match(/BT[\s\S]*?ET/g);
  if (btMatches) {
    cleaned = btMatches
      .map(m => m.replace(/BT|ET|\\n|\\r|\\t|Td|Tj|TJ|'|"|\(|\)/g, ' '))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  return cleaned;
}

// POST - Upload and analyze resume
router.post('/upload', authMiddleware, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a PDF file' });
    }

    console.log('📄 Processing:', req.file.originalname);

    // Read PDF file
    const pdfBuffer = fs.readFileSync(req.file.path);
    
    // Extract text
    let text = extractTextFromPDFBuffer(pdfBuffer);
    
    console.log('📝 Raw text extracted, length:', text.length);

    // If simple extraction fails, try reading as string
    if (!text || text.length < 10) {
      text = fs.readFileSync(req.file.path, 'utf-8');
      text = text.replace(/[^\x20-\x7E\x0A\x0D]/g, ' ').replace(/\s+/g, ' ').trim();
      console.log('📝 Fallback text, length:', text.length);
    }

    if (!text || text.length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract meaningful text. Please ensure your PDF contains selectable text, not just images.'
      });
    }

    // Analyze the text
    const analysis = analyzeResume(text);
    console.log('📊 Score:', analysis.score);

    // Save to database
    const resume = await Resume.create({
      user: req.userId,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      rawText: text.substring(0, 5000), // Store first 5000 chars
      analysis
    });

    res.status(201).json({
      success: true,
      message: 'Resume analyzed!',
      resume: {
        id: resume._id,
        fileName: resume.originalName,
        analysis: resume.analysis
      }
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET - All my resumes
router.get('/my-resumes', authMiddleware, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.userId })
      .sort({ uploadDate: -1 })
      .select('-rawText');
    res.json({ success: true, resumes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching resumes' });
  }
});

// GET - Single resume by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }
    if (resume.user.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.json({ success: true, resume });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching resume' });
  }
});

// DELETE - Remove resume
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }
    if (resume.user.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Delete physical file
    if (resume.filePath && fs.existsSync(resume.filePath)) {
      fs.unlinkSync(resume.filePath);
    }

    await resume.deleteOne();
    res.json({ success: true, message: 'Resume deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting resume' });
  }
});

module.exports = router;