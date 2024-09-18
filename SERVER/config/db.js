// // SERVER/config/db.js
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI); // No deprecated options
//     console.log('MongoDB Connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1); // Exit with failure
//   }
// };

// module.exports = connectDB;



const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
