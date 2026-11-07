const express = require('express');
const router = express.Router();
const historiaController = require('../controllers/historiaController');

router.get('/getHistorias', historiaController.getHistorias);
router.get('/getHistoriaById/:id', historiaController.getHistoriaById);
router.post('/createHistoria', historiaController.createHistoria);
router.put('/updateHistoria/:id', historiaController.updateHistoria);
router.delete('/deleteHistoria/:id', historiaController.deleteHistoria);

module.exports = router;
