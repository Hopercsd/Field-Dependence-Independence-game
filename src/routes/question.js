const express       =    require('express')
const router        =    express.Router()

const QuestionController = require('../controllers/question')

router.get('/', QuestionController.indexQuestions)
router.post('/', QuestionController.create)

module.exports = router;