import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ToggleButton from '../../utils/toggleBtn/ToggleButton';

const Results = () => {
  const { subject, chapter } = useParams();
  const [isActive, setIsActive] = useState(null); // Set to null to differentiate between initial state and fetched state
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

        // Extracting isActive directly
        const isActiveStatus = statusResponse.data;
        console.log("Fetched isActive:", isActiveStatus);
        setIsActive(isActiveStatus); // Should be true or false
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
      setIsActive(newState); // Set the state only after the request succeeds
    } catch (err) {
      console.error('Error updating quiz status:', err);
    }
  };

  // Handle the initial loading state when isActive is null
  if (isActive === null) {
    return <div>Loading...</div>; // Show a loading indicator until the state is fetched
  }

  return (
    <div>
      <ToggleButton isActive={isActive} onToggle={handleToggle} />
      <h3>Results for Chapter: {chapter}</h3>
      <ul>
        {results.map(result => (
          <li key={result._id}>
            Username: {result.username}, Total Marks: {result.totalMarks}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
