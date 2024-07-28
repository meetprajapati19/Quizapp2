import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizForm from '../QuizForm/QuizForm';
import QuestionForm from '../QuestionForm/QuestionForm';
import axios from 'axios';
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

  const handleQuizSubmit = async (quizData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/quiz/create', quizData);
      setQuizInfo({ ...quizData, _id: response.data.quizId });
      setQuestions(Array.from({ length: quizData.numberOfQuestions }, () => ({
        questionText: '',
        options: ['', '', '', ''],
        answer: '',
        marks: ''
      })));
      setShowQuizForm(false);
      setShowQuestionForm(true);
    } catch (err) {
      console.error('Error creating quiz:', err);
    }
  };

  const handleQuestionSubmit = async (questionData) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionNumber - 1] = questionData;
    setQuestions(updatedQuestions);

    if (currentQuestionNumber < quizInfo.numberOfQuestions) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    } else {
      try {
        await axios.post('http://localhost:3000/api/quiz/create/questions', {
          quizId: quizInfo._id,
          questions: updatedQuestions
        });
        console.log('Quiz and questions created successfully');
        setShowQuestionForm(false);
        setCurrentQuestionNumber(1);
        setQuizInfo(null);
        setQuestions([]);
      } catch (err) {
        console.error('Error creating questions:', err);
      }
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
