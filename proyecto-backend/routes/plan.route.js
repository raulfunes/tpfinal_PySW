const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const planCtrl = require('./../controllers/plan.controller');
// definiendo rutas
router.post('/', planCtrl.createPlan);
router.get('/', planCtrl.getPlan);
router.put('/:id', planCtrl.editPlan);
router.delete('/:id', planCtrl.deletePlan);
//exportacion del modulo de rutas
module.exports = router;