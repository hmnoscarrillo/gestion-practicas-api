const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');

// Rutas con la estructura exacta del docente
router.get('/getTutores', tutorController.getTutores);
router.get('/getTutorById/:id', tutorController.getTutorById);
router.post('/postTutor', tutorController.postTutor);
router.put('/putTutor/:id', tutorController.putTutor);
router.delete('/deleteTutor/:id', tutorController.deleteTutor);

// Alias REST estandar
router.get('/', tutorController.getTutores);
router.get('/:id', tutorController.getTutorById);
router.post('/', tutorController.postTutor);
router.put('/:id', tutorController.putTutor);
router.delete('/:id', tutorController.deleteTutor);

module.exports = router;
