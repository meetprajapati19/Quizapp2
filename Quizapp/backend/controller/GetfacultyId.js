// routes/user.js
const express = require('express');
const Faculty = require('../models/Faculty');
const router = express.Router();


 async  function getFacultyId (req, res)  {
    console.log("omish");
  const username = req.query.username;
  console.log(req.query.username);
  try {
    const user = await Faculty.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ facultyId: user.facultyId }); 
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports ={getFacultyId};
