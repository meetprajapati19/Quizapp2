const express = require('express');
const jwt = require('jsonwebtoken');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const router = express.Router();

async function handleSignup(req,res){
        const { username, password } = req.body;
        console.log(req.body);
        console.log("Received data for signup:", username, password);
        try {
          // Check if username already exists
          const existingFaculty = await Faculty.findOne({ username });
          if (existingFaculty) {
            return res.status(400).json({ error: 'Username already exists' });
          }
          const existingStudent = await Student.findOne({ username });
          if (existingStudent) {
            return res.status(400).json({ error: 'Username already exists' });
          }
      
          if (username.endsWith('@charusat.ac.in')) {
            const count = await Faculty.countDocuments();
            const facultyId = count + 1;
      
            // Create new faculty
            const faculty = new Faculty({ username, password, facultyId });
            await faculty.save();
            console.log('Faculty registered:', faculty);
      
            res.status(201).json({ message: 'Faculty registered', facultyId: faculty.facultyId });
          } else if (username.endsWith('@charusat.edu.in')) {
            const student = new Student({ username, password });
            await student.save();
            res.status(201).json({ message: 'Student registered successfully' });
          } else {
            res.status(400).json({ error: 'Invalid email domain' });
          }
        } catch (err) {
          console.error('Signup Error:', err);
          res.status(500).json({ error: 'Error signing up' });
        }
      }
 module.exports={handleSignup};
