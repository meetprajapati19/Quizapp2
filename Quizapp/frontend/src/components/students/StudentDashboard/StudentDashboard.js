import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/api/students/dashboard', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`
  //         }
  //       });
  //       setStudentData(response.data);
  //       const subjectsResponse = await axios.get('http://localhost:3000/api/students/subjects', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`
  //         }
  //       });
  //       setSubjects(subjectsResponse.data);
  //     } catch (err) {
  //       console.error('Error fetching student data:', err);
  //       navigate('/login');
  //     }
  //   };

  //   fetchData();
  // }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSubjectChange = async (e) => {
    setSelectedSubject(e.target.value);
    const chaptersResponse = await axios.get(`http://localhost:3000/api/students/subjects/${e.target.value}/chapters`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setChapters(chaptersResponse.data);
    setSelectedChapter('');
    setQuizzes([]);
    setQuestions([]);
    setAnswers([]);
  };

  const handleChapterChange = async (e) => {
    setSelectedChapter(e.target.value);
    const quizzesResponse = await axios.get(`http://localhost:3000/api/students/quizzes?subject=${selectedSubject}&chapter=${e.target.value}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setQuizzes(quizzesResponse.data);
    setQuestions([]);
    setAnswers([]);
  };

  const handleQuizSelect = async (quizId) => {
    setQuizId(quizId);
    const questionsResponse = await axios.get(`http://localhost:3000/api/students/quizzes/${quizId}/questions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setQuestions(questionsResponse.data);
    setAnswers(Array(questionsResponse.data.length).fill(''));
  };

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/students/quizzes/${quizId}/submit`, { answers }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert(`Your score is: ${response.data.score}`);
    } catch (err) {
      console.error('Error submitting quiz:', err);
    }
  };

  return (
    <div className="student-dashboard">
      <h2>Student Dashboard</h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <p>Welcome, {studentData.username}!</p>

      <div className="selection-container">
        <label htmlFor="subject-select">Select Subject:</label>
        <select id="subject-select" value={selectedSubject} onChange={handleSubjectChange}>
          <option value="">--Select Subject--</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      {selectedSubject && (
        <div className="selection-container">
          <label htmlFor="chapter-select">Select Chapter:</label>
          <select id="chapter-select" value={selectedChapter} onChange={handleChapterChange}>
            <option value="">--Select Chapter--</option>
            {chapters.map(chapter => (
              <option key={chapter} value={chapter}>{chapter}</option>
            ))}
          </select>
        </div>
      )}

      {selectedChapter && (
        <div className="quiz-list">
          <h3>Available Quizzes:</h3>
          {quizzes.map(quiz => (
            <button key={quiz._id} onClick={() => handleQuizSelect(quiz._id)}>
              {quiz.subject} - {quiz.chapter} ({quiz.totalMarks} marks)
            </button>
          ))}
        </div>
      )}

      {questions.length > 0 && (
        <div className="quiz-questions">
          <h3>Questions:</h3>
          {questions.map((question, index) => (
            <div key={question._id} className="question">
              <p>{question.question}</p>
              {question.options.map((option, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleSubmitQuiz}>Submit Quiz</button>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
