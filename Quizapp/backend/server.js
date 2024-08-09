// server.js or app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const facultyRoutes = require('./routes/Faculty');
const quizRoutes = require('./routes/Quiz');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const URL = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use('/api/faculty', facultyRoutes);
app.use('/api/quiz', quizRoutes);

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('MongoDB connection error:', err));
