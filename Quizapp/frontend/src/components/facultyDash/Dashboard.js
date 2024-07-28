// src/components/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizForm from '../QuizForm/QuizForm';
import QuestionForm from '../QuestionForm/QuestionForm';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [quizInfo, setQuizInfo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleQuizSubmit = (quizData) => {
    setQuizInfo(quizData);
    setQuestions(Array.from({ length: quizData.numberOfQuestions }, () => ({
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      marks: ''
    })));
    setShowQuizForm(false);
    setShowQuestionForm(true);
  };

  const handleQuestionSubmit = (questionData) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionNumber - 1] = questionData;
    setQuestions(updatedQuestions);
    if (currentQuestionNumber < quizInfo.numberOfQuestions) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    } else {
      console.log(quizInfo);
      console.log(questions);
      setShowQuestionForm(false);
      setCurrentQuestionNumber(1);
      setQuizInfo(null);
      setQuestions([]);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <button onClick={() => setShowQuizForm(true)} className="create-quiz-button">Create Quiz</button>
      {showQuizForm && <QuizForm onSubmit={handleQuizSubmit} />}
      {showQuestionForm && (
        <QuestionForm
          currentQuestionNumber={currentQuestionNumber}
          totalQuestions={quizInfo.numberOfQuestions}
          onSubmit={handleQuestionSubmit}
        />
      )}
    </div>
  );
};

export default Dashboard;
