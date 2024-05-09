const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');
const User = require('../models/user'); // Assuming you have a User model defined

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { username, userRole, store_id } = user;
    const userInfo = { username, userRole, store_id };

    req.user = userInfo;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.userRole !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
  }
  next();
};

const authorizeManager = (req, res, next) => {
  if (req.user.userRole !== 'manager') {
    return res.status(403).json({ error: 'Access denied. Manager privileges required.' });
  }
  next();
};
exports.authenticateToken = authenticateToken;
exports.authorizeAdmin = authorizeAdmin;
exports.authorizeManager = authorizeManager;