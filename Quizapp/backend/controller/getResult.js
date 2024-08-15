const express = require('express');
const router = express.Router();
const QuizAnswer = require('../models/QuizAnswer');
const { authMiddleware, restrictTo } = require('../middlewares/auth');


async function getResult (req, res)  {
  const { chapters,subjects } = req.params;
  try {
    const results = await QuizAnswer.find({ chapter:chapters,subject:subjects })
                                   
    res.json({ results });
  } catch (err) {
    console.error('Error fetching results:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {getResult};
