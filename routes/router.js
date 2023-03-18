const express = require('express')
const router = express.Router()
const QAController = require('../controllers/QAController')

router.get('/qa/consult', QAController.ConsultQA)
router.get('/qa/consult/:id', QAController.ConsultQAById)
router.post('/qa/create', QAController.CreateQA)
router.post('/qa/ia/text-generator', QAController.generateText)
router.put('/qa/edit/:id', QAController.EditQA)
router.delete('/qa/delete/:id', QAController.DeleteQA)


module.exports = router