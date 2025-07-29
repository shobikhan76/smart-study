const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Database connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit the app if DB connection fails
  }
};

module.exports = connectDB;