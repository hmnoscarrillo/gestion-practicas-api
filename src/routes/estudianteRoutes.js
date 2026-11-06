const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

// Rutas con la estructura exacta del docente
router.get('/getEstudiantes', estudianteController.getEstudiantes);
router.get('/getEstudianteById/:id', estudianteController.getEstudianteById);
router.post('/postEstudiante', estudianteController.postEstudiante);
router.put('/putEstudiante/:id', estudianteController.putEstudiante);
router.delete('/deleteEstudiante/:id', estudianteController.deleteEstudiante);

// Alias REST estandar
router.get('/', estudianteController.getEstudiantes);
router.get('/:id', estudianteController.getEstudianteById);
router.post('/', estudianteController.postEstudiante);
router.put('/:id', estudianteController.putEstudiante);
router.delete('/:id', estudianteController.deleteEstudiante);

module.exports = router;
