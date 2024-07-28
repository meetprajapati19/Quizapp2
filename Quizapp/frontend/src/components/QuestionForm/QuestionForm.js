// src/components/QuestionForm.js
import React, { useState } from 'react';
import './QuestionForm.css';

const QuestionForm = ({ currentQuestionNumber, totalQuestions, onSubmit }) => {
  const [questionData, setQuestionData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    marks: ''
  });

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(questionData);
    setQuestionData({
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      marks: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <h3>Question {currentQuestionNumber} of {totalQuestions}</h3>
      <div className="input-group">
        <label>Question:</label>
        <input type="text" name="question" value={questionData.question} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label>Option 1:</label>
        <input type="text" name="option1" value={questionData.option1} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label>Option 2:</label>
        <input type="text" name="option2" value={questionData.option2} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label>Option 3:</label>
        <input type="text" name="option3" value={questionData.option3} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label>Option 4:</label>
        <input type="text" name="option4" value={questionData.option4} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label>Answer:</label>
        <input type="text" name="answer" value={questionData.answer} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label>Marks:</label>
        <input type="number" name="marks" value={questionData.marks} onChange={handleChange} required />
      </div>
      <button type="submit" className="submit-button">Next</button>
    </form>
  );
};

export default QuestionForm;
