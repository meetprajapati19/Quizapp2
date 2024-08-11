// controllers/quizAnswerController.js
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const QuizAnswer = require('../models/QuizAnswer');


async function submitQuiz(req, res) {
  const { subject, chapter, answers } = req.body;
  // console.log(req.body);

  
  const username = req.user.id; // Extracted from JWT token
  let totalMarks = 0;

  try {
    // Find the quiz based on subject and chapter
    const quiz = await Quiz.findOne({ subject: subject, chapter: chapter });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for the given subject and chapter' });
    }

    const questions = await Question.find({ quizId: quiz._id });

    // Calculate marks
    const answerDetails = await Promise.all(answers.map(async (answer) => {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      if (!question) return null;

      const correct = question.answer === answer.selectedOption;
      if (correct) totalMarks += question.marks;

      return {
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
        correct,
      };
    }));

    // Save to the database
    const quizAnswer = new QuizAnswer({
      username,
      subject,
      chapter,
      answers: answerDetails.filter(detail => detail !== null),
      totalMarks,
    });

    await quizAnswer.save();

    res.json({ message: 'Quiz submitted successfully', totalMarks });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  submitQuiz,
};
