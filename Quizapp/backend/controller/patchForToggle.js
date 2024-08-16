const Quiz = require('../models/Quiz');

async function patchForToggle (req, res)  {
    const { subjects, chapters } = req.params;
    const { isActive } = req.body;
  
    try {
      const quiz = await Quiz.findOneAndUpdate(
        { subject:subjects, chapter:chapters },
        { isActive },
        { new: true }
      );
      
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      res.json({ message: 'Quiz status updated', quiz });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  module.exports={patchForToggle}