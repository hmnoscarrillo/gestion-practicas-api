const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

// Rutas con la estructura exacta del docente
router.get('/getEmpresas', empresaController.getEmpresas);
router.get('/getEmpresaById/:id', empresaController.getEmpresaById);
router.post('/postEmpresa', empresaController.postEmpresa);
router.put('/putEmpresa/:id', empresaController.putEmpresa);
router.delete('/deleteEmpresa/:id', empresaController.deleteEmpresa);

// Alias REST estandar
router.get('/', empresaController.getEmpresas);
router.get('/:id', empresaController.getEmpresaById);
router.post('/', empresaController.postEmpresa);
router.put('/:id', empresaController.putEmpresa);
router.delete('/:id', empresaController.deleteEmpresa);

module.exports = router;
