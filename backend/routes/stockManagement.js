const express = require('express');
const StockEntry = require('../models/stockEntry');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get desserts with stock quantities for a specific store
router.get('/desserts', authenticateToken, async (req, res) => {
    try {
        const { store_id } = req.user;
        const stockEntries = await StockEntry.find({ store_id });
        res.json(stockEntries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update stock quantity for a dessert in a specific store
router.post('/update-stock', authenticateToken, async (req, res) => {
    try {
        const { store_id, dessert_id, quantity } = req.body;
        await StockEntry.findOneAndUpdate(
            { store_id, dessert_id },
            { quantity },
            { upsert: true }
        );
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;