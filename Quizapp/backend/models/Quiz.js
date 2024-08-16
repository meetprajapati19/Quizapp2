// models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  facultyId: {
    type: Number,
    ref: 'Faculty',
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
  totalMarks: {
    type: Number,
    required: true,
  },
  numberOfQuestions: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default:false,
  }
});

module.exports = mongoose.model('Quiz', quizSchema);
