const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

// DNS fix from your server
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

async function checkConnection() {
  console.log('🔍 Checking MongoDB Atlas Connection...');
  console.log(`📝 URI: ${process.env.MONGO_URI ? 'Set ✓' : 'Not Set ✗'}`);
  console.log(`📡 DNS Servers: ${dns.getServers().join(', ')}`);
  console.log('🔄 Attempting to connect...');
  
  try {
    // ✅ No options needed
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
    await mongoose.connection.close();
    console.log('🔒 Connection closed');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n📋 Troubleshooting steps:');
    console.log('1. Check your internet connection');
    console.log('2. Verify MongoDB Atlas URI format');
    console.log('3. Check network access in MongoDB Atlas dashboard');
    console.log('4. Add your current IP to whitelist (0.0.0.0/0 for testing)');
    console.log('5. Verify username and password are correct');
    console.log('6. Check if cluster name is correct');
    
    if (error.message.includes('bad auth')) {
      console.log('⚠️  Authentication failed - check username/password');
    }
    if (error.message.includes('ENOTFOUND')) {
      console.log('⚠️  Network error - check your connection');
    }
    if (error.message.includes('timed out')) {
      console.log('⚠️  Timeout - check network access and firewall');
    }
    if (error.message.includes('queryTxt')) {
      console.log('⚠️  DNS resolution failed - check cluster name in URI');
    }
  }
}

checkConnection();