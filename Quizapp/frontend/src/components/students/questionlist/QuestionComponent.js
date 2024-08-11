import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './QuestionComponent.css';

const QuestionComponent = () => {
  const token = localStorage.getItem('token');
    

  const { subject, chapter } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/student/${subject}/${chapter}/questions`,{ headers: {
      Authorization: `Bearer ${token}`,
    },})
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, [subject, chapter]);

  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: {
        questionId: questions[currentQuestionIndex]._id,
        selectedOption: e.target.value,
      },
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Send the answers to the backend
    axios.post('http://localhost:3000/api/student/submit', {
      subject,
      chapter,
      answers: Object.values(answers),
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('Quiz submitted:', response.data);
      navigate('/studentdash');
    })
    .catch(error => console.error('Error submitting quiz:', error));
  };

  if (!questions.length) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="question-component">
      <h3>{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</h3>
      <div className="question-text">{questions[currentQuestionIndex].questionText}</div>
      <div className="options">
        {questions[currentQuestionIndex].options.map((option, index) => (
          <div key={index}>
            <input 
              type="radio" 
              name="option" 
              value={option}
              checked={answers[currentQuestionIndex]?.selectedOption === option}
              onChange={handleAnswerChange}
            />
            {option}
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default QuestionComponent;
