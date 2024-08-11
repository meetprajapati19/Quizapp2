const jwt = require('jsonwebtoken');

// Middleware to extract and verify JWT token
const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  // Extract the token from the Bearer scheme
  const token = authHeader.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  try {
    // Verify the token and decode the user info
    const decoded = jwt.verify(token, 'secret'); // Replace 'secret' with your actual secret key
    req.user = decoded; // Attach the decoded user information to the request object

    console.log(decoded);
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
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
    if (!req.user.id || !req.user.role) {
      return res.status(403).json({ error: 'Forbidden: Role information missing' });
    }
    
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden: Access restricted to ' + role + ' only' });
    }
    
    next(); // Proceed if the user has the required role
  };
}

module.exports = { authMiddleware, studentOnly, restrictTo };
