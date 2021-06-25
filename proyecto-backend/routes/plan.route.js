const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const planCtrl = require('./../controllers/plan.controller');
const authCtrl = require('./../controllers/auth.controller')
// definiendo rutas
router.post('/',[authCtrl.verifyToken, authCtrl.isEntrenador], planCtrl.createPlan);
router.get('/', planCtrl.getPlan);
router.put('/:id',[authCtrl.verifyToken, authCtrl.isEntrenador], planCtrl.editPlan);
router.delete('/:id',[authCtrl.verifyToken, authCtrl.isEntrenador], planCtrl.deletePlan);
//exportacion del modulo de rutas
module.exports = router;