const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');

router.get('/getServicios', servicioController.getServicios);
router.get('/getServicioById/:id', servicioController.getServicioById);
router.post('/createServicio', servicioController.createServicio);
router.put('/updateServicio/:id', servicioController.updateServicio);
router.delete('/deleteServicio/:id', servicioController.deleteServicio);

module.exports = router;
