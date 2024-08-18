import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './FacultyChapter.css'

const FacultyChapter = () => {
  const [chapters, setChapters] = useState([]);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const { subject } = useParams();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/faculty/${subject}/chapters`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setChapters(response.data.chapters);
      } catch (err) {
        console.error('Error fetching chapters:', err);
      }
    };

    if (role === 'faculty') {
      fetchChapters();
    }
  }, [role, subject]);

  const handleChapterClick = (chapter) => {
    navigate(`/dashboard/${subject}/${chapter}/answer`);
  };

  return (
    <div className="dashboard">
      {role === 'faculty' && (
        <>
          <h3>Chapters for {subject}:</h3>
          <div className="button-container">
            {chapters.map(chapter => (
              <button key={chapter} onClick={() => handleChapterClick(chapter)}>
                {chapter}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FacultyChapter;
