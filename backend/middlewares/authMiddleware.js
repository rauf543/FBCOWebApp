const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.userId = decoded.userId;
        req.store_id = decoded.store_id;
        req.userRole = decoded.userRole
        next();
    });
};

module.exports = authenticateToken;