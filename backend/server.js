// ⚠️ CRITICAL: This MUST be the FIRST line - before ANY other imports
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ========== MIDDLEWARES ==========
// Middleware 1: JSON parser (yeh har request se pehle run hoga)
app.use(express.json());

// Middleware 2: Logger (optional - har request log karne ke liye)
app.use((req, res, next) => {
  console.log(`📝 ${req.method} request on ${req.url}`);
  next(); // Important! Agle route/middleware pe jao
});

// ========== DATABASE CONNECTION ==========
const connectDB = async () => {
  try {
    console.log('🔍 Testing DNS resolution...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.log('🔄 Retrying in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// ========== ROUTES ==========
// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// ✅ YAHAN PE APNE AUTH ROUTES ADD KARO
// Auth routes (import karna hoga)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);  // Sab auth routes yahan handle honge

// Future routes yahan add karna
// app.use('/api/dsa', dsaRoutes);
// app.use('/api/resume', resumeRoutes);

// ========== ERROR HANDLING MIDDLEWARE (Last mein aata hai) ==========
// Agar koi route match nahi hota toh 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// ========== SERVER START ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Using DNS servers: ${dns.getServers().join(', ')}`);
});