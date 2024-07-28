const express = require('express');
const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const router = express.Router();

// Create a new quiz
router.post('/create', async (req, res) => {
  try {
    console.log("Received request to create quiz with data:", req.body);

    const quizData = {
      facultyId:(req.body.facultyId),
      subject: req.body.subject,
      chapter: req.body.chapter,
      totalMarks: Number(req.body.totalMarks),
      numberOfQuestions: Number(req.body.numberOfQuestions),
    };

    const quiz = new Quiz(quizData);
    await quiz.save();
    console.log("Quiz created successfully:", quiz);
    res.status(201).json({ quizId: quiz._id });
  } catch (err) {
    console.error("Error creating quiz:", err);
    res.status(500).json({ error: err.message });
  }
});

// Create questions for a quiz
router.post('/create/questions', async (req, res) => {
  try {
    const { quizId, questions } = req.body;
    const questionDocs = questions.map((question) => ({
      ...question,
      quizId: new mongoose.Types.ObjectId(quizId),
    }));
    await Question.insertMany(questionDocs);
    res.status(201).json({ message: 'Questions created successfully' });
  } catch (err) {
    console.error("Error creating questions:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get quizzes by faculty ID
router.get('/faculty/:facultyId', async (req, res) => {
  try {
    const facultyId = new mongoose.Types.ObjectId(req.params.facultyId);
    const quizzes = await Quiz.find({ facultyId });
    res.status(200).json(quizzes);
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
