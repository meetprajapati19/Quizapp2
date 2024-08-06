const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'secret'); // Replace 'secret' with your actual secret key
    req.user = decoded;
    console.log(decoded)
    console.log(req.user)
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

const studentOnly = (req, res, next) => {
  if (req.user.userType !== 'student') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

function restricTo(role){
  return function(req,res,next){
    // console.log(req.role);
  if(!req.user.id || !req.user.role){
    return res.status(403).json({ error: 'Forbidden' });
  }
  if(req.user.role != role){
    return res.status(403).json({ error: 'Forbidden' });
  }
  return next();
}
}

module.exports = { authMiddleware, studentOnly, restricTo };
