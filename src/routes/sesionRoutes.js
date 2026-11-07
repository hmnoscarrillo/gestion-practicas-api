const express = require('express');
const router = express.Router();
const sesionController = require('../controllers/sesionController');

// Rutas de la tabla central del sistema
router.get('/getSesiones', sesionController.getSesiones);
router.get('/getSesionById/:id', sesionController.getSesionById);
router.post('/createSesion', sesionController.createSesion);
router.put('/updateSesion/:id', sesionController.updateSesion);
router.delete('/deleteSesion/:id', sesionController.deleteSesion);

module.exports = router;
