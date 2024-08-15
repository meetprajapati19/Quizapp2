const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const { checkQuizSubmission } = require('./checkQuizSubmission');

async function getQuestions(req, res) {
  const { subject, chapter } = req.params;
  console.log(req.params);
  const username = req.user.id; 

  try {
    const alreadySubmitted = await checkQuizSubmission(subject, chapter, username);
    console.log(alreadySubmitted);

    if (alreadySubmitted) {
      return res.status(400).json({ message: 'Already submitted a response for this quiz.' });
    }

    // Find the quiz based on subject and chapter
    const quiz = await Quiz.findOne({ subject: subject, chapter: chapter });
    console.log(quiz);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for the given subject and chapter' });
    }

    const questions = await Question.find({ quizId: quiz._id });

    res.json(questions);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  getQuestions,
};