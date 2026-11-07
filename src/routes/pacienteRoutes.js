const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// Rutas con la convencion arquitectonica del docente
router.get('/getPacientes', pacienteController.getPacientes);
router.get('/getPacienteById/:id', pacienteController.getPacienteById);
router.post('/createPaciente', pacienteController.createPaciente);
router.put('/updatePaciente/:id', pacienteController.updatePaciente);
router.delete('/deletePaciente/:id', pacienteController.deletePaciente);

module.exports = router;
