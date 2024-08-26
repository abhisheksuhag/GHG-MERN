const express = require('express');
const mongoose = require('mongoose');
const submitAnswers = require('./routes/submitAnswers');
const questionRoutes = require('./routes/questionRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

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

// Only include the question routes
app.use('/api', questionRoutes);
app.use('/api',submitAnswers)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
