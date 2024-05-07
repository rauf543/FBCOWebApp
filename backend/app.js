const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/auth');
const stockManagementRoutes = require('./routes/stockManagement');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', authRoutes);
app.use('/api', stockManagementRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});