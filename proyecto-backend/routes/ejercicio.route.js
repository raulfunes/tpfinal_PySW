const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const ejercicioCtrl = require('./../controllers/ejercicio.controller');
const authCtrl = require('./../controllers/auth.controller')
// definiendo rutas
router.post('/',authCtrl.verifyToken, ejercicioCtrl.createEjercicio);
router.get('/:musculo/:funcion/:dificultad', ejercicioCtrl.getEjercicio);
router.put('/:id',authCtrl.verifyToken,ejercicioCtrl.editEjercicio);
router.delete('/:id',authCtrl.verifyToken, ejercicioCtrl.deleteEjercicio);
//exportacion del modulo de rutas
module.exports = router;