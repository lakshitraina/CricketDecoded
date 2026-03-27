const mongoose = require('mongoose');

const auctionSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  userTeam: { type: String, required: true },
  purse: { type: Number, default: 100.0 }, // 100 Crores
  squad: [{
    name: String,
    role: String,
    price: Number
  }],
  viewedPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  aiTeams: {
    type: Map,
    of: new mongoose.Schema({
      purse: { type: Number, default: 100.0 },
      squadSize: { type: Number, default: 0 }
    })
  },
  createdAt: { type: Date, default: Date.now, expires: '24h' } // Auto-cleanup matches memory
});

module.exports = mongoose.models.AuctionSession || mongoose.model('AuctionSession', auctionSessionSchema);
