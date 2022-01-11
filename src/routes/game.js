const express       =    require('express');
const router        =    express.Router();

const GameController = require('../controllers/game');

router.get('/',GameController.indexGames);
router.post('/',GameController.create);

module.exports = router;