const express = require('express');
const mongoose = require('mongoose');
const questionRoutes = require('./routes/questionRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
