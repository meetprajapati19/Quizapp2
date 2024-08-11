// models/QuizAnswer.js
const mongoose = require('mongoose');

const quizAnswerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  chapter: {
    type: String,
    required: true,
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    selectedOption: {
      type: String,
      required: true,
    },
    correct: {
      type: Boolean,
      required: true,
    }
  }],
  totalMarks: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('QuizAnswer', quizAnswerSchema);
