const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const generalRoutes = require('./routes/generalRoutes'); // Generalized routes
const calculatedDataRoutes = require('./routes/calculatedDataRoutes');

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

// register generalized routes for calculated data
app.use('/api/calculated', calculatedDataRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
