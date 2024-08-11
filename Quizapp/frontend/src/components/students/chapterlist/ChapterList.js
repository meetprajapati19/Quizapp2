import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChapterList.css';

const ChapterList = ({ subject, chapters, onSelectChapter }) => {
  const navigate = useNavigate();

  const handleChapterClick = (chapter) => {
    
    navigate(`/studentdash/${subject}/${chapter}/questions`);
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
