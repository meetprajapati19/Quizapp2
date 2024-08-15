import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to get the subject from the URL

const FacultyChapter = () => {
  const [chapters, setChapters] = useState([]);
  const role = localStorage.getItem('role'); // No need to set role since it's not being updated
  const navigate = useNavigate();
  const { subject } = useParams(); // Get the subject from the URL

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
  }, [role, subject]); // Include subject as a dependency

  const handleChapterClick = (chapter) => {
    navigate(`/dashboard/${subject}/${chapter}/answer`);
  };

  return (
    <div className="dashboard">
      {role === 'faculty' && (
        <div>
          <h3>Chapters for {subject}:</h3>
          {chapters.map(chapter => (
            <button key={chapter} onClick={() => handleChapterClick(chapter)}>
              {chapter}
            </button> 
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyChapter;
