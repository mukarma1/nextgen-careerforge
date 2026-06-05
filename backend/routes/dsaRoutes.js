const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const jwt = require('jsonwebtoken');

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  console.log('🔑 Token received:', token ? 'Yes' : 'No');
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.log('✅ User ID:', req.userId);
    next();
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// GET /api/dsa/problems - Get all problems
router.get('/problems', authMiddleware, async (req, res) => {
  try {
    console.log('📋 GET /problems - User:', req.userId);
    
    const problems = await Problem.find({ user: req.userId }).sort({ solvedAt: -1 });
    console.log(`✅ Found ${problems.length} problems`);
    
    res.json({ success: true, problems });
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/dsa/problems - Add new problem
router.post('/problems', authMiddleware, async (req, res) => {
  try {
    console.log('📝 POST /problems - User:', req.userId);
    console.log('📦 Request body:', req.body);
    
    const { title, platform, difficulty, link, notes } = req.body;
    
    // Validate required fields
    if (!title || !difficulty) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and difficulty are required' 
      });
    }
    
    const problem = new Problem({
      user: req.userId,
      title,
      platform: platform || 'LeetCode',
      difficulty,
      link: link || '',
      notes: notes || ''
    });
    
    await problem.save();
    console.log('✅ Problem saved successfully:', problem._id);
    
    res.status(201).json({ success: true, problem });
  } catch (error) {
    console.error('❌ Error saving problem:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/dsa/problems/:id - Delete a problem
router.delete('/problems/:id', authMiddleware, async (req, res) => {
  try {
    console.log('🗑️ DELETE /problems - ID:', req.params.id);
    
    const problem = await Problem.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });
    
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    
    console.log('✅ Problem deleted');
    res.json({ success: true, message: 'Problem deleted' });
  } catch (error) {
    console.error('Error deleting problem:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ FIXED: GET /api/dsa/stats - Get statistics
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    console.log('📊 GET /stats - User:', req.userId);
    
    const problems = await Problem.find({ user: req.userId });
    console.log(`Found ${problems.length} problems for stats`);
    
    const stats = {
      total: problems.length,
      easy: problems.filter(p => p.difficulty === 'Easy').length,
      medium: problems.filter(p => p.difficulty === 'Medium').length,
      hard: problems.filter(p => p.difficulty === 'Hard').length
    };
    
    console.log('Stats calculated:', stats);
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Test route
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'DSA routes are working!' });
});

module.exports = router;