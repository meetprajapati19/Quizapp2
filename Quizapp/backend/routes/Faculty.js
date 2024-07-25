const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Faculty = require('../models/Faculty');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const faculty = new Faculty({ username, password });
    await faculty.save();
    res.status(201).json({ message: 'Faculty registered' });
  } catch (err) {
    res.status(500).json({ error: 'Error signing up' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const faculty = await Faculty.findOne({ username });
    if (faculty && (await faculty.matchPassword(password))) {
      const token = jwt.sign({ id: faculty._id }, 'secret', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
