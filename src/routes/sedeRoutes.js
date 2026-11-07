const express = require('express');
const router = express.Router();
const sedeController = require('../controllers/sedeController');

router.get('/getSedes', sedeController.getSedes);
router.get('/getSedeById/:id', sedeController.getSedeById);
router.post('/createSede', sedeController.createSede);
router.put('/updateSede/:id', sedeController.updateSede);
router.delete('/deleteSede/:id', sedeController.deleteSede);

module.exports = router;
