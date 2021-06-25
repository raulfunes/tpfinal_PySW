const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const planCtrl = require('./../controllers/plan.controller');
const authCtrl = require('./../controllers/auth.controller')
// definiendo rutas
router.post('/',authCtrl.verifyToken, planCtrl.createPlan);
router.get('/', planCtrl.getPlan);
router.put('/:id',authCtrl.verifyToken, planCtrl.editPlan);
router.delete('/:id',authCtrl.verifyToken, planCtrl.deletePlan);
//exportacion del modulo de rutas
module.exports = router;