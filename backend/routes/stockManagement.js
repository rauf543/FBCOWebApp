//App\backend\routes

const express = require('express');
const StockEntry = require('../models/stockEntry');
const { authenticateToken, authorizeManager } = require('../middlewares/authMiddleware');
const router = express.Router();
const Dessert = require('../models/desserts');
const mongoose = require('mongoose');


// Get desserts with stock quantities for a specific store
router.get('/desserts', authenticateToken, authorizeManager, async (req, res) => {
    try {
        const { store_id } = req.user;
        const stockEntries = await StockEntry.find({ store_id }).populate("dessert_id");
        res.json(stockEntries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update stock quantity for a dessert in a specific store
router.post('/update-stock', authenticateToken, async (req, res) => {
    try {
        const { dessert_id, quantity } = req.body;
        console.log(req.user)
        const { store_id } = req.user;
        console.log(store_id)
        // Check if the dessert_id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(dessert_id)) {
            return res.status(400).json({ error: 'Invalid dessert_id' });
        }

        // Check if the Dessert exists
        console.log(dessert_id)
        const dessert = await Dessert.findById(dessert_id);
        if (!dessert) {
            return res.status(404).json({ error: 'Dessert not found' });
        }

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

// Add a new route to get all available desserts
router.get('/available-desserts', authenticateToken, authorizeManager, async (req, res) => {
  try {
    const availableDesserts = await Dessert.find();
    res.json(availableDesserts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new route to add a dessert to the stock list
router.post('/add-dessert', authenticateToken, authorizeManager, async (req, res) => {
  try {
    const { store_id } = req.user;
    const { dessert_id, quantity } = req.body;

    // Check if the dessert already exists in the stock
    const existingEntry = await StockEntry.findOne({ store_id, dessert_id });

    if (existingEntry) {
        return res.status(400).json({ error: 'Dessert already exists in the stock' });
    } else {
      // Create a new stock entry
      await StockEntry.create({ store_id, dessert_id, quantity });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;