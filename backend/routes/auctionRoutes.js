const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');

router.post('/auction/init', auctionController.initSession);
router.get('/auction/session/:sessionId', auctionController.getSession);
router.get('/auction/player/:sessionId', auctionController.getNextPlayer);
router.post('/auction/bid', auctionController.processUserBid);
router.post('/auction/pass', auctionController.processPass);

module.exports = router;
