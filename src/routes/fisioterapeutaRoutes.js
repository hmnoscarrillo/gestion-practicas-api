const express = require('express');
const router = express.Router();
const fisioterapeutaController = require('../controllers/fisioterapeutaController');

router.get('/getFisioterapeutas', fisioterapeutaController.getFisioterapeutas);
router.get('/getFisioterapeutaById/:id', fisioterapeutaController.getFisioterapeutaById);
router.post('/createFisioterapeuta', fisioterapeutaController.createFisioterapeuta);
router.put('/updateFisioterapeuta/:id', fisioterapeutaController.updateFisioterapeuta);
router.delete('/deleteFisioterapeuta/:id', fisioterapeutaController.deleteFisioterapeuta);

module.exports = router;
