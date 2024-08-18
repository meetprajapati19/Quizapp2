import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FacultySubject.css'; // Import the CSS file for styling

const FacultySubject = () => {
  const [subjects, setSubjects] = useState([]);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/faculty/subjects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubjects(response.data.subjects);
      } catch (err) {
        console.error('Error fetching subjects:', err);
      }
    };

    if (role === 'faculty') {
      fetchSubjects();
    }
  }, [role]);

  const handleSubjectClick = (subject) => {
    navigate(`/dashboard/${subject}/chapters`);
  };

  return (
    <div className="faculty-subjects">
      {role === 'faculty' && (
        <div className="subjects-container">
          <h3 className="subjects-title">Your Subjects:</h3>
          <div className="subjects-list">
            {subjects.map(subject => (
              <button
                key={subject}
                className="subject-button"
                onClick={() => handleSubjectClick(subject)}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultySubject;
