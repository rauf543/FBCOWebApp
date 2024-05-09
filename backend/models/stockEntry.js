const mongoose = require('mongoose');

const stockEntrySchema = new mongoose.Schema({
  store_id: { type: String, required: true },
  dessert_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dessert', required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('StockEntry', stockEntrySchema);