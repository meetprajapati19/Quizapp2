const express = require('express');
const jwt = require('jsonwebtoken');
const Faculty = require('../models/Faculty');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  console.log("Received data for signup:", username, password);
  try {
    // Check if username already exists
    const existingFaculty = await Faculty.findOne({ username });
    if (existingFaculty) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Get the number of documents in the collection
    const count = await Faculty.countDocuments();
    const facultyId = count + 1;

    // Create new faculty
    const faculty = new Faculty({ username, password, facultyId });
    await faculty.save();
    console.log('Faculty registered:', faculty);

    res.status(201).json({ message: 'Faculty registered', facultyId: faculty.facultyId });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Error signing up' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt with username:", username, "and password:", password);
  try {
    const faculty = await Faculty.findOne({ username });
    console.log('Found faculty:', faculty);

    if (faculty && await faculty.matchPassword(password)) {
      const token = jwt.sign({ id: faculty._id, facultyId: faculty.facultyId }, 'secret', { expiresIn: '1Y' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
