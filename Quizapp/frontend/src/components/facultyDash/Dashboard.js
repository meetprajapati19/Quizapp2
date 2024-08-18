import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizForm from '../QuizForm/QuizForm';
import QuestionForm from '../QuestionForm/QuestionForm';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

import './Dashboard.css';
import FacultySubject from '../facultySubject/FacultySubject';
import { FaSignOutAlt, FaPlusCircle, FaQuoteLeft } from 'react-icons/fa';

const Dashboard = () => {
  const [facultyId, setFacultyId] = useState(null);
  const [username, setUserName] = useState('');
  const navigate = useNavigate();
  const [quizId, setQuizId] = useState(null);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [quizInfo, setQuizInfo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.id);
    }
  }, []);

  useEffect(() => {
    if (username) {
      const fetchFacultyId = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/faculty/getFacultyId', {
            params: { username }
          });
          setFacultyId(response.data.facultyId);
        } catch (err) {
          console.error('Error fetching faculty ID:', err);
        }
      };
      fetchFacultyId();
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleQuizSubmit = (quizData) => {
    setQuizId(quizData._id);
    setQuizInfo({ ...quizData, _id: quizData.quizId });
    setQuestions(Array.from({ length: quizData.numberOfQuestions }, () => ({
      questionText: '',
      options: ['', '', '', ''],
      answer: '',
      marks: ''
    })));
    setShowQuizForm(false);
    setShowQuestionForm(true);
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
          quizId: quizId,
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
    <div className="dashboard-container">
      {!showQuizForm && !showQuestionForm && (
        <>
          <div className="dashboard-header">
            <h2 className="dashboard-title">Dashboard</h2>
            <h5 className="faculty-id">Your Faculty ID: {facultyId}</h5>
            <button onClick={handleLogout} className="logout-button">
              <FaSignOutAlt /> Logout
            </button>
          </div>

          <div className="dashboard-content">
            <FacultySubject />
            {role === 'faculty' && (
              <button onClick={() => setShowQuizForm(true)} className="create-quiz-button">
                <FaPlusCircle /> Create Quiz
              </button>
            )}
          </div>
        </>
      )}
      {showQuizForm && <QuizForm onSubmit={handleQuizSubmit} />}
      {showQuestionForm && (
        <QuestionForm
          currentQuestionNumber={currentQuestionNumber}
          totalQuestions={quizInfo.numberOfQuestions}
          onSubmit={handleQuestionSubmit}
        />
      )}
      <div className={`quote-section ${showQuizForm || showQuestionForm ? 'hidden' : ''}`}>
        <FaQuoteLeft className="quote-icon" />
        <p className="quote-text">
          "Education is not the learning of facts, but the training of the mind to think."
        </p>
        <p className="quote-author">- Albert Einstein</p>
      </div>
    </div>
  );
};

export default Dashboard;
