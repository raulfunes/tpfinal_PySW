const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const router = express.Router();
//defino controlador para el manejo de CRUD
const usuarioCtrl = require('./../controllers/usuario.controller');
// definiendo rutas
router.post('/', authCtrl.verifyToken, usuarioCtrl.createUsuario);
router.post('/login', usuarioCtrl.loginUsuario);
router.get('/:persona',authCtrl.verifyToken , usuarioCtrl.getUsuario);
//exportacion del modulo de rutas
module.exports = router;
