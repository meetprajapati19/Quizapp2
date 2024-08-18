import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SubjectList from '../subjectslist/SubjectList';
import ChapterList from '../chapterlist/ChapterList';

import './StudentDashboard.css';

const StudentDashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const { subject } = useParams();




  useEffect(() => {
    if (subject) {
      axios
        .get(`http://localhost:3000/api/student/${subject}/chapters`)
        .then((response) => setChapters(response.data))
        .catch((error) => console.error('Error fetching chapters:', error));
    } else {
      axios
        .get('http://localhost:3000/api/student/subjects')
        .then((response) => setSubjects(response.data))
        .catch((error) => console.error('Error fetching subjects:', error));
    }
  }, [subject]);

  return (
    <div className="student-dashboard">
      <h2>Student Dashboard</h2>
      {subject ? (
        <ChapterList subject={subject} chapters={chapters} />
      ) : (
        <SubjectList subjects={subjects} />
      )}
    </div>
  );
};

export default StudentDashboard;
