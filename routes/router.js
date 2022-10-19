const express = require('express')
const router = express.Router()
const QAController = require('../controllers/QAController')

router.get('/qa/consult', QAController.ConsultQA)
router.post('/qa/create', QAController.CreateQA)
router.put('/qa/edit/:id', QAController.EditQA)
router.delete('/qa/delete/:id', QAController.DeleteQA)


module.exports = router