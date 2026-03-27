const { v4: uuidv4 } = require('uuid');
const Player = require('../models/Player');
const AuctionSession = require('../models/AuctionSession');

const AI_TEAMS = ['CSK', 'MI', 'KKR', 'SRH', 'GT', 'DC', 'PBKS', 'RR', 'LSG'];

// Generate an AI Team Map setup
const getInitialAITeams = (userTeam) => {
  const teamsMap = {};
  AI_TEAMS.forEach(team => {
    if (team !== userTeam) {
      teamsMap[team] = { purse: 100.0, squadSize: 0 };
    }
  });
  return teamsMap;
};

exports.initSession = async (req, res) => {
  try {
    const { userTeam } = req.body;
    if (!userTeam) return res.status(400).json({ error: 'userTeam is required' });

    const sessionId = uuidv4();
    const session = new AuctionSession({
      sessionId,
      userTeam,
      purse: 100.0,
      squad: [],
      viewedPlayers: [],
      aiTeams: getInitialAITeams(userTeam)
    });

    await session.save();
    res.status(201).json({ sessionId, userTeam, purse: 100.0 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to init session', details: error.message });
  }
};

exports.getSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await AuctionSession.findOne({ sessionId });
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getNextPlayer = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await AuctionSession.findOne({ sessionId });
    if (!session) return res.status(404).json({ error: 'Session not found' });

    // Find a random player NOT in viewedPlayers
    const player = await Player.aggregate([
      { $match: { _id: { $nin: session.viewedPlayers } } },
      { $sample: { size: 1 } }
    ]);

    if (!player.length) {
      return res.json({ message: 'No more players available!', player: null });
    }

    res.json({ player: player[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch player' });
  }
};

exports.processUserBid = async (req, res) => {
  try {
    const { sessionId, playerId, bidAmount } = req.body;
    const session = await AuctionSession.findOne({ sessionId });
    const player = await Player.findById(playerId);

    if (!session || !player) return res.status(404).json({ error: 'Session or Player missing' });

    // Validate user budget
    if (session.purse < bidAmount) {
      return res.status(400).json({ error: 'Insufficient purse' });
    }

    /* AI COUNTER BID LOGIC */
    // Find eligible AI teams that can afford the next bid increment (+0.5)
    const nextBid = bidAmount + 0.5;
    let eligibleAITeams = [];
    
    for (let [team, stats] of session.aiTeams.entries()) {
      if (stats.purse >= nextBid && stats.squadSize < 25) {
        eligibleAITeams.push(team);
      }
    }

    // Probability of AI countering decreases as the price goes up past 10 Cr
    let counterProbability = player.basePrice > 1.5 ? 0.75 : 0.5;
    if (bidAmount > 10.0) counterProbability = 0.3;
    if (bidAmount > 15.0) counterProbability = 0.1;

    // AI decides to counter
    if (eligibleAITeams.length > 0 && Math.random() < counterProbability) {
      // Pick random AI team to counter
      const randomAI = eligibleAITeams[Math.floor(Math.random() * eligibleAITeams.length)];
      return res.json({ 
        status: 'countered', 
        highestBid: nextBid, 
        highestBidder: randomAI,
        message: `${randomAI} raised the bid to ₹${nextBid} Cr!`
      });
    }

    /* USER WINS THE PLAYER */
    // If AI does not counter, user wins
    session.purse -= bidAmount;
    session.squad.push({
      name: player.name,
      role: player.role,
      price: bidAmount
    });
    session.viewedPlayers.push(player._id);
    await session.save();

    return res.json({
      status: 'won',
      highestBid: bidAmount,
      highestBidder: session.userTeam,
      message: `SOLD! You bought ${player.name} for ₹${bidAmount} Cr.`
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to process bid' });
  }
};

exports.processPass = async (req, res) => {
  try {
    const { sessionId, playerId, currentBid, highestBidder } = req.body;
    const session = await AuctionSession.findOne({ sessionId });
    const player = await Player.findById(playerId);

    if (!session || !player) return res.status(404).json({ error: 'Session or Player missing' });

    // Ensure player is marked as viewed
    session.viewedPlayers.push(player._id);

    // If an AI was the highest bidder, they win it
    if (highestBidder && highestBidder !== session.userTeam && highestBidder !== 'None') {
      const aiStats = session.aiTeams.get(highestBidder);
      if (aiStats) {
        aiStats.purse -= (currentBid || player.basePrice);
        aiStats.squadSize += 1;
        session.aiTeams.set(highestBidder, aiStats);
      }
      await session.save();
      return res.json({ message: `SOLD! ${highestBidder} bought ${player.name} for ₹${currentBid || player.basePrice} Cr.` });
    }

    // If no one bid, AI might buy at base price (20% chance)
    let aiBoughtTeam = null;
    let aiTeamsArr = Array.from(session.aiTeams.keys());
    if (Math.random() < 0.2) {
        const randomAI = aiTeamsArr[Math.floor(Math.random() * aiTeamsArr.length)];
        const stats = session.aiTeams.get(randomAI);
        if (stats.purse >= player.basePrice) {
            stats.purse -= player.basePrice;
            stats.squadSize += 1;
            session.aiTeams.set(randomAI, stats);
            aiBoughtTeam = randomAI;
        }
    }

    await session.save();

    if (aiBoughtTeam) {
        return res.json({ message: `SOLD! ${aiBoughtTeam} bought ${player.name} at base price ₹${player.basePrice} Cr.` });
    }
    
    return res.json({ message: `${player.name} goes UNSOLD.` });

  } catch (error) {
    res.status(500).json({ error: 'Failed to process pass' });
  }
};
