import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/student/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setStudentData(response.data);
      } catch (err) {
        console.error('Error fetching student data:', err);
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="student-dashboard">
      <h2>Student Dashboard</h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <p>Welcome, {studentData.username}!</p>
      {/* Add more student-specific information here */}
    </div>
  );
};

export default StudentDashboard;
