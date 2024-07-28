const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
  marks: { type: Number, required: true }
});

const studentResultSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  marksObtained: { type: Number, required: true }
});

const quizSchema = new mongoose.Schema({
  facultyId: { type: Number, required: true },
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  numberOfQuestions: { type: Number, required: true },
  questions: [questionSchema],
  studentResults: [studentResultSchema]  // New field for storing student results
});

module.exports = mongoose.model('Quiz', quizSchema);
