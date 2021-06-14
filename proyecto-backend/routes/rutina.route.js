const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const rutinaCtrl = require('./../controllers/rutina.controller');
// definiendo rutas
router.post('/', rutinaCtrl.createRutina);
router.get('/', rutinaCtrl.getRutina);
//exportacion del modulo de rutas
module.exports = router;