import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Results = () => {
  const { subject,chapter } = useParams();
  console.log(subject,chapter);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/faculty/${subject}/${chapter}/answer`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setResults(response.data.results);
      } catch (err) {
        console.error('Error fetching results:', err);
      }
    };

    fetchResults();
  }, [chapter]);
  console.log(results);

  return (
    <div>
      <h3>Results for Chapter: {chapter}</h3>
      <ul>
        {results.map(result => (
          <li key={result._id}>
            Username: {result.username}, totalMarks: {result.totalMarks}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
