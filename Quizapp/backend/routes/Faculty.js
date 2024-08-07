// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');

const { handleLogin } = require('../controller/Login');
const { handleSignup } = require('../controller/Signup');
const router = express.Router();

router.post('/signup',handleSignup);

router.post('/login',handleLogin );

module.exports = router;
