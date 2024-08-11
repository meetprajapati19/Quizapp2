const Quiz = require('../models/Quiz');

async function getChaptersBySubject(req, res) {
  const { subjects } = req.params;
//   console.log("Subject received:", subjects);

  try {
    // console.log("Inside");
    // Find quizzes with the given subject and get distinct chapters
    const chapters = await Quiz.find({ subject: subjects }).distinct('chapter');
    // console.log("Chapters found:", chapters);
    res.json(chapters);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  getChaptersBySubject,
};
