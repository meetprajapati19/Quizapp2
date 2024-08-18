import React, { useState } from 'react';
import './QuestionForm.css';

const QuestionForm = ({ currentQuestionNumber, totalQuestions, onSubmit }) => {
  const [questionData, setQuestionData] = useState({
    questionText: '',
    options: ['', '', '', ''],
    answer: '',
    marks: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...questionData.options];
    newOptions[index] = value;
    setQuestionData({ ...questionData, options: newOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(questionData);
    setQuestionData({
      questionText: '',
      options: ['', '', '', ''],
      answer: '',
      marks: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <h3>Question {currentQuestionNumber} / {totalQuestions}</h3>
      <div className="input-group">
        <label>Question Text:</label>
        <input
          type="text"
          name="questionText"
          value={questionData.questionText}
          onChange={handleChange}
          required
          placeholder="Enter the question text here..."
        />
      </div>
      {questionData.options.map((option, index) => (
        <div className="input-group" key={index}>
          <label>Option {index + 1}:</label>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
            placeholder={`Enter option ${index + 1}...`}
          />
        </div>
      ))}
      <div className="input-group">
        <label>Answer:</label>
        <input
          type="text"
          name="answer"
          value={questionData.answer}
          onChange={handleChange}
          required
          placeholder="Enter the correct answer..."
        />
      </div>
      <div className="input-group">
        <label>Marks:</label>
        <input
          type="number"
          name="marks"
          value={questionData.marks}
          onChange={handleChange}
          required
          placeholder="Enter marks..."
        />
      </div>
      <button type="submit" className="submit-button">Next</button>
    </form>
  );
};

export default QuestionForm;
