const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const ejercicioCtrl = require('./../controllers/ejercicio.controller');
// definiendo rutas
router.post('/', ejercicioCtrl.createEjercicio);
router.get('/', ejercicioCtrl.getEjercicio);
//exportacion del modulo de rutas
module.exports = router;