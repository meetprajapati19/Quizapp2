// controllers/quizController.js
const Quiz = require('../models/Quiz');



async function getSubjects(req, res) {
  try {
    const subjects = await Quiz.distinct('subject');
   
    
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  getSubjects,
};
