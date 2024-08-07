const express = require('express');
const jwt = require('jsonwebtoken');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');

const router = express.Router();


async function handleLogin(req,res)
{
    
        const { username, password } = req.body;
        console.log("Login attempt with username:", username, "and password:", password);
        try {
          let user;
          if (username.endsWith('@charusat.ac.in')) {
            user = await Faculty.findOne({ username });
          } else if (username.endsWith('@charusat.edu.in')) {
            user = await Student.findOne({ username });
          } else {
            return res.status(400).json({ error: 'Invalid email domain' });
          }
          console.log(await user.matchPassword(password));
      
      
          if (user && await user.matchPassword(password)) {
            const data = { id: user._id, role: user.role }
            console.log(data);
            const token = jwt.sign(data, 'secret', { expiresIn: '1Y' });
            res.json({ token, role:user.role });
          } else {
            res.status(401).json({ error: 'Invalid credentials' });
          }
        } catch (err) {
          console.error('Login Error:', err);
          res.status(500).json({ error: 'Error logging in' });
        }
      }
      module.exports={handleLogin};
