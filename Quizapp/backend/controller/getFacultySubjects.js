const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

const Faculty = require('../models/Faculty');

// Endpoint to get all subjects for the logged-in faculty
async function getFacultySubject(req, res) {
  
  try {
    const username = req.user.id; 

    

    const facultyId = req.facultyId; 
    console.log(facultyId);

    const quizzes = await Quiz.find({ facultyId:facultyId }).distinct('subject');
    console.log(quizzes);

    return res.json({ subjects: quizzes });
  } catch (err) {
    console.error('Error fetching subjects:', err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getFacultySubject };
