const express       =    require('express');
const router        =    express.Router();

const AttemptController = require('../controllers/attempt');

router.get('/',AttemptController.indexAttempts);
router.post('/',AttemptController.create);

module.exports = router;