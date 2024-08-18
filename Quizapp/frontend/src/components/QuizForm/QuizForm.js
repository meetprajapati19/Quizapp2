import React, { useState } from 'react';
import './QuizForm.css';
import axios from 'axios';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting quiz info:", quizInfo);
      const response = await axios.post('http://localhost:3000/api/quiz/create', quizInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("Quiz created:", response.data);
      onSubmit(response.data.quiz);  // Pass the entire response data including quizId
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="quiz-form-container">
      <h3 className="form-title">Create Your Quiz</h3>
      <form onSubmit={handleSubmit} className="quiz-form">
        <div className="input-group">
          <label htmlFor="facultyId">Faculty ID:</label>
          <input type="text" id="facultyId" name="facultyId" value={quizInfo.facultyId} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" name="subject" value={quizInfo.subject} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="chapter">Chapter:</label>
          <input type="text" id="chapter" name="chapter" value={quizInfo.chapter} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="totalMarks">Total Marks:</label>
          <input type="number" id="totalMarks" name="totalMarks" value={quizInfo.totalMarks} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="numberOfQuestions">Number of Questions:</label>
          <input type="number" id="numberOfQuestions" name="numberOfQuestions" value={quizInfo.numberOfQuestions} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default QuizForm;
