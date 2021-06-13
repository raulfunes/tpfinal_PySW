const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const rolCtrl = require('./../controllers/rol.controller');
// definiendo rutas
router.post('/', rolCtrl.createRol);
router.get('/:id', rolCtrl.getRol);
//exportacion del modulo de rutas
module.exports = router;