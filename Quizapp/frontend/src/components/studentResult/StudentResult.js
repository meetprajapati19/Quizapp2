import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ToggleButton from '../../utils/toggleBtn/ToggleButton';
import './Results.css'; // Import the CSS file for styling

const Results = () => {
  const { subject, chapter } = useParams();
  const [isActive, setIsActive] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResultsAndStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const [resultsResponse, statusResponse] = await Promise.all([
          axios.get(`http://localhost:3000/api/faculty/${subject}/${chapter}/answer`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`http://localhost:3000/api/faculty/${subject}/${chapter}/isactive`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setResults(resultsResponse.data.results);
        setIsActive(statusResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchResultsAndStatus();
  }, [subject, chapter]);

  const handleToggle = async (newState) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3000/api/faculty/${subject}/${chapter}/isactive`, {
        isActive: newState,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsActive(newState);
    } catch (err) {
      console.error('Error updating quiz status:', err);
    }
  };

  if (isActive === null) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="results-container">
      <ToggleButton isActive={isActive} onToggle={handleToggle} />
      <h3 className="results-header">Results for Chapter: {chapter}</h3>
      <div className="results-table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Total Marks</th>
            </tr>
          </thead>
          <tbody>
            {results.map(result => (
              <tr key={result._id} className="result-item">
                <td>{result.username}</td>
                <td>{result.totalMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;
