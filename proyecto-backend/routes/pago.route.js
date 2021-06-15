const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const pagoCtrl = require('./../controllers/pago.controller');
// definiendo rutas
router.post('/', pagoCtrl.createPago);
router.get('/', pagoCtrl.getPago);
router.put('/:id', pagoCtrl.editPago);
router.delete('/:id', pagoCtrl.deletePago);
//exportacion del modulo de rutas
module.exports = router;