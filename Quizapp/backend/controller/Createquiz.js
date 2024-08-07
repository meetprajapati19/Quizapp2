const express = require('express');
const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const { restricTo } = require('../middlewares/auth');
const router = express.Router();

async function createQuiz(req, res)
{
    
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
      }

      module.exports={createQuiz}