const QuizAnswer = require('../models/QuizAnswer');

async function checkQuizSubmission(subject, chapter, username) {
  console.log(subject,chapter,username);
  try {
    const quizAnswer = await QuizAnswer.findOne({ username, subject, chapter });
    return !!quizAnswer; // Returns true if a submission is found, false otherwise
  } catch (err) {
    console.error('Error checking quiz submission:', err);
    throw new Error('Server Error'); // Throws an error that should be caught in the calling function
  }
}

module.exports = { checkQuizSubmission };