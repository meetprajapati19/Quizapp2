const jwt = require('jsonwebtoken');
const Faculty = require('../models/Faculty'); // Make sure this model exists for your Faculty data
const Quiz = require('../models/Quiz');

// Middleware to extract and verify JWT token and attach facultyId and username
const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  try {
    // Verify the token and decode the user info
    const decoded = jwt.verify(token, 'secret'); 
    console.log(decoded);

    req.user = decoded; // Attach decoded data to req.user
    if(decoded.role==='faculty')
    {

      
      // Assuming decoded contains a field `username` to identify the user
      const username = decoded.id;
      console.log(username);
      
      // Find the faculty based on the username
      const faculty = await Faculty.findOne({username: username });
      
      if (!faculty) {
        return res.status(404).json({ error: 'Faculty not found' });
      }
      
      // Attach facultyId and username to the request object
      req.facultyId = faculty.facultyId;
    }
      
      
      
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.error('Error in authentication middleware:', err);
      res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// Middleware to allow access only to students
const studentOnly = (req, res, next) => {
  if (req.user.userType !== 'student') {
    return res.status(403).json({ error: 'Forbidden: Access restricted to students only' });
  }
  next(); // Proceed if the user is a student
};

// Middleware to restrict access to a specific role
function restrictTo(role) {
  return function (req, res, next) {
    if (!req.user.role) {
      return res.status(403).json({ error: 'Forbidden: Role information missing' });
    }
    
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden: Access restricted to ' + role + ' only' });
    }
    
    next(); // Proceed if the user has the required role
  };
}

module.exports = { authMiddleware, studentOnly, restrictTo };
