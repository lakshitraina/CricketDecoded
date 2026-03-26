const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/matches', matchController.getAllMatches);
router.get('/match/:slug', matchController.getMatchBySlug);
router.post('/admin/add-match', matchController.addMatch);

module.exports = router;
