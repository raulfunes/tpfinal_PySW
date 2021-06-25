const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const personaCtrl = require('../controllers/persona.controller');
const authCtrl = require('./../controllers/auth.controller')
// definiendo rutas
router.post('/',[authCtrl.verifyToken, authCtrl.isEntrenador], personaCtrl.createPersona);
router.get('/',authCtrl.verifyToken, personaCtrl.getPersonas);
router.get('/:id',authCtrl.verifyToken, personaCtrl.getPersona);
router.put('/:id',[authCtrl.verifyToken, authCtrl.isEntrenador], personaCtrl.editPersona);
router.delete('/:id',[authCtrl.verifyToken, authCtrl.isEntrenador], personaCtrl.deletePersona);
//exportacion del modulo de rutas
module.exports = router;