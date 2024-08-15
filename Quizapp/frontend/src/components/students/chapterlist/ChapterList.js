import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChapterList.css';

const ChapterList = ({ subject, chapters }) => {
  const navigate = useNavigate();
  
  const handleChapterClick = async (chapter) => {
    try {
      navigate(`/studentdash/${subject}/${chapter}/questions`);
      const response = await axios.get(`http://localhost:3000/api/student/${subject}/${chapter}/questions`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Replace with actual token retrieval
      });
      // console.log(response.status);
      
      // if (response.status === 200) {
      // }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('You have already submitted the quiz for this chapter.');
      } else {
        console.error('Error checking quiz submission', error);
        alert('An error occurred while checking the quiz submission.');
      }
    }
  };

  return (
    <div className="chapter-list">
      <h3>Available Chapters for {subject}</h3>
      {chapters.map((chapter) => (
        <button
          key={chapter}
          onClick={() => handleChapterClick(chapter)}
          className="chapter-button"
        >
          {chapter}
        </button>
      ))}
      <button onClick={() => navigate('/studentdash')} className="back-button">
        Back to Subjects
      </button>
    </div>
  );
};

export default ChapterList;
