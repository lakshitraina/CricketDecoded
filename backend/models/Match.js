const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  prediction: { type: String, required: true },
  winProbability: {
    team1: { type: Number, required: true },
    team2: { type: Number, required: true }
  },
  pitchReport: { type: String, required: true },
  tossPrediction: { type: String, required: true },
  playing11: { type: [String], required: true },
  slug: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
