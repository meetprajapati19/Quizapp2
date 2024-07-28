const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();

// Create a new quiz
router.post('/create', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get quizzes by faculty ID
router.get('/faculty/:facultyId', async (req, res) => {
  try {
    const facultyId = req.params.facultyId;
    const quizzes = await Quiz.find({ facultyId: facultyId }); // Ensure facultyId is handled as a string
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get results of a specific quiz
router.get('/quiz/:quizId/results', async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz.results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
