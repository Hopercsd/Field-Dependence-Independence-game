const express       =    require('express');
const router        =    express.Router();

const HftSAController = require('../controllers/hftSA');

router.get('/',HftSAController.index);
router.post('/',HftSAController.create);

module.exports = router;