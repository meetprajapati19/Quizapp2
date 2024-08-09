const express = require('express');
const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const { restricTo } = require('../middlewares/auth');
const { createQuiz } = require('../controller/Createquiz');
const router = express.Router();

async function createQuestion (req, res) {
  try {
    const { quizId, questions } = req.body;
    const questionDocs = questions.map((question) => ({
      ...question,
      quizId: new mongoose.Types.ObjectId(quizId),
    }));
    await Question.insertMany(questionDocs);
    res.status(201).json({ message: 'Questions created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  }

  module.exports={createQuestion}