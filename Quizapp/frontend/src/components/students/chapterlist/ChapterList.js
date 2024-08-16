import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChapterList.css';

const ChapterList = ({ subject, chapters }) => {
  const navigate = useNavigate();
  
  const handleChapterClick = async (chapter) => {
    try {
      // Check if the quiz is active for the selected chapter
      const response1 = await axios.get(`http://localhost:3000/api/faculty/${subject}/${chapter}/isactive`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // console.log(req.user.id);

      const  isActive  = response1.data;
    
      
      
      if (!isActive) {
        alert('This quiz is not currently active.');
        return;
      }

      // Navigate to the questions page if the quiz is active
      navigate(`/studentdash/${subject}/${chapter}/questions`);
      
      // You might want to keep the below API call to fetch questions here, but it's not necessary to do it twice.
      const response = await axios.get(`http://localhost:3000/api/student/${subject}/${chapter}/questions`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
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
