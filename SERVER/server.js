// // SERVER/server.js
// const express = require('express');
// const mongoose = require('mongoose');  // Import mongoose
// const cors = require('cors');
// require('dotenv').config(); // Load environment variables from .env file
// const connectDB = require('./config/db');
// const stationaryCombustionRoutes = require('./routes/stationaryCombustion');

// const app = express();

// // Connect to MongoDB using the mongoose library
// connectDB();

// // Enable CORS for cross-origin requests
// app.use(cors({
//   origin: 'http://localhost:5173', // Replace with your frontend origin
//   credentials: true, // Enable cookies and credentials if needed
// }));

// // Middleware to parse incoming JSON requests
// app.use(express.json());

// // Add routes
// app.use('/api/stationary-combustion', stationaryCombustionRoutes);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });












const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const generalRoutes = require('./routes/generalRoutes'); // Generalized routes

const app = express();

// Connect to MongoDB
connectDB();



// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware for parsing JSON
app.use(express.json());

// Register generalized routes
app.use('/api', generalRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
