// routes/auth.js
const express = require('express');


const { handleLogin } = require('../controller/Login');
const { handleSignup } = require('../controller/Signup');
const { authMiddleware } = require('../middlewares/auth');
const { getFacultyId } = require('../controller/GetfacultyId');
const { getFacultySubject } = require('../controller/getFacultySubjects');
const { getFacultyChapter } = require('../controller/getFacultyChapter');
const { getResult } = require('../controller/getResult');
const { getToggleResult } = require('../controller/getToggleResult');
const { patchForToggle } = require('../controller/patchForToggle');
const router = express.Router();


router.post('/signup',handleSignup);

router.post('/login',handleLogin );
router.get('/getFacultyId',getFacultyId);
router.get('/subjects',authMiddleware,getFacultySubject);
router.get('/:subjects/chapters',authMiddleware,getFacultyChapter);
router.get('/:subjects/:chapters/answer',authMiddleware,getResult);
router.get('/:subjects/:chapters/isactive',authMiddleware,getToggleResult);
router.patch('/:subjects/:chapters/isactive',authMiddleware,patchForToggle);


module.exports = router;
