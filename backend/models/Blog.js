const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true }, // HTML/Markdown content
  keywords: { type: String },
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  category: { type: String, required: true }, // 'prediction', 'fixtures', 'analysis', 'squad', 'tickets', 'guide'
  image: { type: String } // Thumbnail path
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
