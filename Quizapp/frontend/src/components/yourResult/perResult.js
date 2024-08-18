import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './perResult.css';
import {jwtDecode} from 'jwt-decode';

const StudentQuizResults = () => {
  const { subject, chapter } = useParams();
  const [results, setResults] = useState(null);
 
  const token = localStorage.getItem('token');
  const [username, setUserName] = useState('');

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.id);
    }
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/faculty/${subject}/${chapter}/answer`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching quiz results:', error);
      }
    };
    

    fetchResults();
  }, [subject, chapter, token]);

  if (!results) {
    return <div className="results-container">Loading results...</div>;
  }
  console.log(username);
  const filteredResults = results.filter(result => result.username === username);
  console.log(filteredResults)

  return (
    <div className="results-container">
      <h3>Results for Chapter {chapter}</h3>
      {filteredResults.length === 0 ? (
        <p className="no-results">No results found for this chapter.</p>
      ) : (
        filteredResults.map((result) => (
          
          <div className="result-card" key={result._id}>
            <h4>{`Username: ${result.username}`}</h4>
            <h5>{`Total Marks: ${result.totalMarks}`}</h5>
            <ul>
              {result.answers.map((answer) => (
                <li key={answer._id}>
                  <p>{`Question ID: ${answer.questionId}`}</p>
                  <p>{`Selected Option: ${answer.selectedOption}`}</p>
                  <p>{`Correct: ${answer.correct ? 'Yes' : 'No'}`}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentQuizResults;
