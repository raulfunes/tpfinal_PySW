const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const pagoCtrl = require('./../controllers/pago.controller');
const authCtrl = require('./../controllers/auth.controller')
// definiendo rutas
router.post('/',[authCtrl.verifyToken, authCtrl.isEntrenador], pagoCtrl.createPago);
router.get('/',authCtrl.verifyToken, pagoCtrl.getPago);
router.put('/:id',[authCtrl.verifyToken, authCtrl.isEntrenador], pagoCtrl.editPago);
router.delete('/:id',[authCtrl.verifyToken, authCtrl.isEntrenador], pagoCtrl.deletePago);
//exportacion del modulo de rutas
module.exports = router;