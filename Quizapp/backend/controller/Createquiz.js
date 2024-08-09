const express = require('express');
const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

const router = express.Router();

async function createQuiz(req, res)
{
  // console.log("inside create quiz");
  try {
    const quizData = {
      facultyId: req.body.facultyId,
      subject: req.body.subject,
      chapter: req.body.chapter,
      totalMarks: Number(req.body.totalMarks),
      numberOfQuestions: Number(req.body.numberOfQuestions),
    };

    const quiz = new Quiz(quizData);
    console.log(quiz);

    await quiz.save();
    res.status(201).json({ quiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
      }

      module.exports={createQuiz}