const express = require('express');
const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const { restricTo } = require('../middlewares/auth');
const { createQuiz } = require('../controller/Createquiz');
const { createQuestion } = require('../controller/Createquestion');
const router = express.Router();


router.post('/create',createQuiz );


router.post('/create/questions',createQuestion );




module.exports = router;
