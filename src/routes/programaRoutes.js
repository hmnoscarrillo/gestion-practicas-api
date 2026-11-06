const express = require('express');
const router = express.Router();
const programaController = require('../controllers/programaController');

// Rutas con la estructura exacta del docente
router.get('/getProgramas', programaController.getProgramas);
router.get('/getProgramaById/:id', programaController.getProgramaById);
router.post('/postPrograma', programaController.postPrograma);
router.put('/putPrograma/:id', programaController.putPrograma);
router.delete('/deletePrograma/:id', programaController.deletePrograma);

// Alias REST estandar
router.get('/', programaController.getProgramas);
router.get('/:id', programaController.getProgramaById);
router.post('/', programaController.postPrograma);
router.put('/:id', programaController.putPrograma);
router.delete('/:id', programaController.deletePrograma);

module.exports = router;
