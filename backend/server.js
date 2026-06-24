// ⚠️ CRITICAL: DNS fix
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const app = express();
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes      = require('./routes/authRoutes');
const dsaRoutes       = require('./routes/dsaRoutes');
const resumeRoutes    = require('./routes/resumeRoutes');
const interviewRoutes = require('./routes/interviewRoutes');

const connectDB = async () => {
  try {
    // ✅ Fixed: Removed deprecated options
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.log('🔄 Retrying in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

connectDB();

app.get('/', (req, res) => res.json({ message: 'Server is running' }));

app.use('/api/auth',      authRoutes);
app.use('/api/dsa',       dsaRoutes);
app.use('/api/resume',    resumeRoutes);
app.use('/api/interview', interviewRoutes);

app.use((req, res) => {
  console.log(`❌ Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: `Route not found: ${req.method} ${req.url}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 DNS servers: ${dns.getServers().join(', ')}`);
  console.log(`✅ Auth routes:      /api/auth`);
  console.log(`✅ DSA routes:       /api/dsa`);
  console.log(`✅ Resume routes:    /api/resume`);
  console.log(`✅ Interview routes: /api/interview`);
});