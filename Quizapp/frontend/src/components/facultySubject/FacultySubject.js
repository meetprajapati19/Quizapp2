import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FacultySubject = () => {
  const [subjects, setSubjects] = useState([]);
  const role = localStorage.getItem('role'); // No need to set role since it's not being updated
  const navigate = useNavigate(); // Initialize navigate

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
    <div className="dashboard">
      {role === 'faculty' && (
        <div>
          <h3>Your Subjects:</h3>
          {subjects.map(subject => (
            <button key={subject} onClick={() => handleSubjectClick(subject)}>
              {subject}
            </button> 
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultySubject;
