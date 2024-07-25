require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const facultyRoutes = require('./routes/faculty');

const app = express();

const URL = process.env.URL;

console.log(URL);

// Connect to MongoDB
mongoose.connect(URL).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use('/api/faculty', facultyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
