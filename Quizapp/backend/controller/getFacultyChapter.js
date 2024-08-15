const Quiz = require("../models/Quiz");

async function getFacultyChapter(req,res) {
    console.log("inside in chapter");
  
        try {
          const { subjects } = req.params;
    
    
          const facultyId = req.facultyId;
          console.log(subjects,facultyId);
      
          
          const chapters = await Quiz.find({ subject:subjects, facultyId:facultyId }).distinct('chapter');
      
          res.json({ chapters });
        } catch (err) {
          console.error('Error fetching chapters:', err);
          res.status(500).json({ message: 'Server Error' });
        }
    
}
module.exports={getFacultyChapter};