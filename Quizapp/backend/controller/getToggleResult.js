const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

const Faculty = require('../models/Faculty');

// Endpoint to get all subjects for the logged-in faculty
async function getToggleResult(req, res) {
  
    
    try {
        
        const{subjects,chapters}= req.params;
       
        const isActive = await Quiz.findOne({ subject:subjects, chapter:chapters });
        console.log(isActive.isActive);

        res.json( isActive.isActive );
  } catch (err) {
    console.error('Error fetching chapters:', err);
    res.status(500).json({ message: 'Server Error' });
  }

};

module.exports = { getToggleResult };
