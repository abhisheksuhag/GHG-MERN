const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes'); // Question related routes
const submitAnswersRoutes = require('./routes/submitAnswers'); // Submit answers route
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

let userIdCounter = 1; // Initialize the user ID counter

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend origin
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error.message);
});

// Middleware to assign incremental user ID
app.use((req, res, next) => {
  req.userId = userIdCounter++;
  next();
});

// Use the question routes
app.use('/api', questionRoutes);
app.use('/api', submitAnswersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
