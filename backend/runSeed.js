require('dotenv').config();
const mongoose = require('mongoose');
const seedQuestions = require('./seeders/interviewQuestions');

// Atlas URI - check karo .env mein kya naam hai
const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DB_URI;

if (!mongoURI) {
  console.error('❌ MongoDB URI not found! Check .env file');
  console.log('Available env vars:', Object.keys(process.env).filter(k => k.includes('MONGO') || k.includes('DB') || k.includes('URI')));
  process.exit(1);
}

console.log('Connecting to MongoDB...');

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await seedQuestions();
    console.log('✅ Done!');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Connection Error:', err.message);
    process.exit();
  });