const express = require('express');
const router = express.Router();
const practicaController = require('../controllers/practicaController');

// Rutas con la estructura exacta del docente
router.get('/getPracticas', practicaController.getPracticas);
router.get('/getPracticaById/:id', practicaController.getPracticaById);
router.post('/postPractica', practicaController.postPractica);
router.put('/putPractica/:id', practicaController.putPractica);
router.delete('/deletePractica/:id', practicaController.deletePractica);

// Alias REST estandar
router.get('/', practicaController.getPracticas);
router.get('/:id', practicaController.getPracticaById);
router.post('/', practicaController.postPractica);
router.put('/:id', practicaController.putPractica);
router.delete('/:id', practicaController.deletePractica);

module.exports = router;
