import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <h3>Question {currentQuestionNumber} / {totalQuestions}</h3>
      <div>
        <label>Question Text:</label>
        <input
          type="text"
          name="questionText"
          value={questionData.questionText}
          onChange={handleChange}
          required
        />
      </div>
      {questionData.options.map((option, index) => (
        <div key={index}>
          <label>Option {index + 1}:</label>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
        </div>
      ))}
      <div>
        <label>Answer:</label>
        <input
          type="text"
          name="answer"
          value={questionData.answer}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Marks:</label>
        <input
          type="number"
          name="marks"
          value={questionData.marks}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default QuestionForm;
