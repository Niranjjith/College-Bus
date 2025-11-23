const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://niranjjithbathery_db_user:804diZ7xJvHIMzp8@cluster0.scxp5yc.mongodb.net/nilgiri_transport?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MongoDB URI is not defined. Please check your .env file.');
    }
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

