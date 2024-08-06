const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const { authMiddleware, studentOnly } = require('../middleware/auth');
const router = express.Router();

// ... (existing routes)

// Fetch subjects
router.get('/subjects', authMiddleware, studentOnly, async (req, res) => {
  try {
    const subjects = await Quiz.distinct('subject');
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch chapters for a subject
router.get('/subjects/:subject/chapters', authMiddleware, studentOnly, async (req, res) => {
  const { subject } = req.params;
  try {
    const chapters = await Quiz.distinct('chapter', { subject });
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
