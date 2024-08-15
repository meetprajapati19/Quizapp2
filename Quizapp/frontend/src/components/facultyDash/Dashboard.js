import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizForm from '../QuizForm/QuizForm';
import QuestionForm from '../QuestionForm/QuestionForm';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';



import './Dashboard.css';
import FacultySubject from '../facultySubject/FacultySubject';

const Dashboard = () => {


  const [facultyId, setFacultyId] = useState(null);
  const [username, setUserName] = useState('');
  
  const navigate = useNavigate();
  const [quizId,setquizId] = useState(null)
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
  // console.log(username);

  useEffect(() => {
    if (username) {
      const fetchFacultyId = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/faculty/getFacultyId', {
            params: { username }
          });
          // console.log(response);
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
    setquizId(quizData._id);
    console.log(quizData);
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
    <div className="dashboard">
      <h2>Dashboard</h2>
      <h5>your faculty id :{facultyId}</h5>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <FacultySubject/>
      
      {role === 'faculty' && (
        <button onClick={() => setShowQuizForm(true)} className="create-quiz-button">Create Quiz</button>
      )}
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
