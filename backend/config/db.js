const mongoose = require('mongoose');
const mongoUrl =  process.env.DB_URL;
const connectDB = async () => {
  await mongoose.connect(mongoUrl);
  console.log('MongoDB connected');
};

module.exports = connectDB;
