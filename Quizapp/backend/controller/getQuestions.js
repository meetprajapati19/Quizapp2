const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

async function getQuestions(req, res) {
  const { subjects, chapter } = req.params;
  console.log(req.params);

  try {
    // Find the quiz based on subject and chapter
    const quiz = await Quiz.findOne({ subject: subjects, chapter: chapter });
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
