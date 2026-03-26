const Match = require('../models/Match');
const slugify = require('slugify');

exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({ date: 1, time: 1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getMatchBySlug = async (req, res) => {
  try {
    const match = await Match.findOne({ slug: req.params.slug });
    if (!match) return res.status(404).json({ error: 'Match not found' });
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addMatch = async (req, res) => {
  try {
    const { team1, team2, date, time, venue, prediction, winProbability, pitchReport, tossPrediction, playing11 } = req.body;
    
    // Auto Slug Generator as requested!
    const slug = slugify(`${team1} vs ${team2} prediction today 2026`, { lower: true, strict: true });
    
    // Check if exists
    let match = await Match.findOne({ slug });
    if (match) {
      match = await Match.findOneAndUpdate({ slug }, req.body, { new: true });
    } else {
      match = new Match({ ...req.body, slug });
      await match.save();
    }
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
