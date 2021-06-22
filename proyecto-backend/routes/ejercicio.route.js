const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const ejercicioCtrl = require('./../controllers/ejercicio.controller');
// definiendo rutas
router.post('/', ejercicioCtrl.createEjercicio);
router.get('/:musculo/:funcion/:dificultad', ejercicioCtrl.getEjercicio);
router.put('/:id',ejercicioCtrl.editEjercicio);
router.delete('/:id', ejercicioCtrl.deleteEjercicio);
//exportacion del modulo de rutas
module.exports = router;