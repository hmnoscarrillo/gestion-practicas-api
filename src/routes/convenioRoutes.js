const express = require('express');
const router = express.Router();
const convenioController = require('../controllers/convenioController');

// Rutas con la estructura exacta del docente
router.get('/getConvenios', convenioController.getConvenios);
router.get('/getConvenioById/:id', convenioController.getConvenioById);
router.post('/postConvenio', convenioController.postConvenio);
router.put('/putConvenio/:id', convenioController.putConvenio);
router.delete('/deleteConvenio/:id', convenioController.deleteConvenio);

// Alias REST estandar
router.get('/', convenioController.getConvenios);
router.get('/:id', convenioController.getConvenioById);
router.post('/', convenioController.postConvenio);
router.put('/:id', convenioController.putConvenio);
router.delete('/:id', convenioController.deleteConvenio);

module.exports = router;
