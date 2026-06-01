const express = require('express');
const router = express.Router();

// Import controllers - CHECK PATH IS CORRECT
const authController = require('../controllers/authController');

// Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working!' });
});

module.exports = router;