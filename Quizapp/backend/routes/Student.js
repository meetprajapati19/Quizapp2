
const express = require('express');
const { getSubjects } = require('../controller/Getsubject');
const { getChaptersBySubject } = require('../controller/getChapterBySubjects');
const { getQuestions } = require('../controller/getQuestions');
const { submitQuiz } = require('../controller/quizAnswer');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();


// Get all distinct subjects
router.get('/subjects', getSubjects);

router.get('/:subjects/chapters', getChaptersBySubject);
router.get('/:subjects/:chapter/questions',getQuestions );
router.post('/submit',authMiddleware,submitQuiz)


module.exports = router;