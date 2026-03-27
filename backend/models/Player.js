const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true, enum: ['Batter', 'Bowler', 'All-Rounder', 'Wicketkeeper'] },
  basePrice: { type: Number, required: true }, // Stored in Crores (e.g. 2.0)
  nationality: { type: String, default: 'Indian' },
  status: { type: String, default: 'Available' }
});

module.exports = mongoose.models.Player || mongoose.model('Player', playerSchema);
