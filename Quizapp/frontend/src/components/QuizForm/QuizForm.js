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
      // console.log(response.data);
      console.log("Quiz created:", response.data);
      onSubmit(response.data.quiz);  // Pass the entire response data including quizId
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  }; 3

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
