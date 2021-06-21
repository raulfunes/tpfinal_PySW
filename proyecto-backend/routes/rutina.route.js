const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const rutinaCtrl = require('./../controllers/rutina.controller');
// definiendo rutas
router.post('/', rutinaCtrl.createRutina);
router.get('/', rutinaCtrl.getRutinas);
router.get('/:asistencia', rutinaCtrl.getRutina);
router.put('/:id', rutinaCtrl.editRutina);
router.delete('/:id', rutinaCtrl.deleteRutina);
//exportacion del modulo de rutas
module.exports = router;