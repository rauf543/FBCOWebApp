//backend/routes

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecret, jwtExpiration } = require('../config/auth');
const { authenticateToken, authorizeManager } = require('../middlewares/authMiddleware');
const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
    try {
        const { username, password, store_id, userRole } = req.body;
        console.log(username)
        console.log(userRole)
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            store_id,
            userRole,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, userRole: user.userRole }, jwtSecret, { expiresIn: jwtExpiration });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define the verifyToken route
router.get('/verifyToken', authenticateToken, async (req, res) => {
  try {
    res.json({ isValid: true, user: req.user});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Export the router

module.exports = router;