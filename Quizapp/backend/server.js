require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const facultyRoutes = require('./routes/Faculty'); // Ensure this path is correct

const app = express();

const URL = process.env.URL;
const PORT = process.env.PORT || 3000;

if (!URL) {
    console.error('MongoDB connection string (URL) is missing.');
    process.exit(1);
}

console.log('MongoDB URI:', URL);

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Middleware to parse incoming request bodies
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/faculty', facultyRoutes); // Ensure the route path is correct

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
