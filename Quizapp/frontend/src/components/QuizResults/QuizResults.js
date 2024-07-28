import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizResults = () => {
  const { quizId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/quiz/${quizId}/results`);
        setResults(response.data);
      } catch (err) {
        console.error('Error fetching results:', err);
      }
    };

    fetchResults();
  }, [quizId]);

  return (
    <div>
      <h2>Quiz Results</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Marks Obtained</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.studentId}>
                <td>{result.studentId}</td>
                <td>{result.studentName}</td>
                <td>{result.marksObtained}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QuizResults;
