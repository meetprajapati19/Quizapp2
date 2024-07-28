// src/components/QuizForm.js
import React, { useState } from 'react';
import './QuizForm.css';

const QuizForm = ({ onSubmit }) => {
  const [quizInfo, setQuizInfo] = useState({
    facultyId: '',
    subject: '',
    chapter: '',
    totalMarks: '',
    numberOfQuestions: ''
  });

  const handleChange = (e) => {
    setQuizInfo({ ...quizInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(quizInfo);
  };

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      <h3>Create Quiz</h3>
      <div className="input-group">
        <label>Faculty ID:</label>
        <input type="text" name="facultyId" value={quizInfo.facultyId} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label>Subject:</label>
        <input type="text" name="subject" value={quizInfo.subject} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label>Chapter:</label>
        <input type="text" name="chapter" value={quizInfo.chapter} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label>Total Marks:</label>
        <input type="number" name="totalMarks" value={quizInfo.totalMarks} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label>Number of Questions:</label>
        <input type="number" name="numberOfQuestions" value={quizInfo.numberOfQuestions} onChange={handleChange} required />
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default QuizForm;
