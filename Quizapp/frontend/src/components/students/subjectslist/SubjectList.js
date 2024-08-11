import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubjectList.css';

const SubjectList = ({ subjects, onSelectSubject }) => {
  const navigate = useNavigate();

  const handleSubjectClick = (subject) => {
   
    navigate(`/studentdash/${subject}`);
  };

  return (
    <div className="subject-list">
      <h3>Available Subjects</h3>
      {subjects.map((subject) => (
        <button
          key={subject}
          onClick={() => handleSubjectClick(subject)}
          className="subject-button"
        >
          {subject}
        </button>
      ))}
    </div>
  );
};

export default SubjectList;
