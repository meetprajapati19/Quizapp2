import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChapterList.css';

const ChapterList = ({ subject, chapters }) => {
  const navigate = useNavigate();
  
  const handleChapterClick = async (chapter) => {
    try {
      const response1 = await axios.get(`http://localhost:3000/api/faculty/${subject}/${chapter}/isactive`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const response = await axios.get(`http://localhost:3000/api/student/${subject}/${chapter}/questions`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const isActive = response1.data;

      if (!isActive) {
        alert('This quiz is not currently active.');
        return;
      }

      navigate(`/studentdash/${subject}/${chapter}/questions`);
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        navigate(`/studentdash/${subject}/${chapter}/results`);
      } else {
        console.error('Error checking quiz submission', error);
        alert('An error occurred while checking the quiz submission.');
      }
    }
  };

  return (
    <div className="chapter-list">
      <h3>Available Chapters for {subject}</h3>
      <div className="button-grid">
        {chapters.map((chapter) => (
          <button
            key={chapter}
            onClick={() => handleChapterClick(chapter)}
            className="chapter-button"
          >
            {chapter}
          </button>
        ))}
      </div>
      <button onClick={() => navigate('/studentdash')} className="back-button">
        Back to Subjects
      </button>
    </div>
  );
};

export default ChapterList;
