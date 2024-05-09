const mongoose = require('mongoose');

const dessertSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  // Add any other relevant fields for desserts
});

module.exports = mongoose.model('Dessert', dessertSchema);