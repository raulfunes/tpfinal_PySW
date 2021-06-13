const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const personaCtrl = require('../controllers/persona.controller');
// definiendo rutas
router.post('/', personaCtrl.createPersona);
router.get('/', personaCtrl.getPersona);
router.put('/:id', personaCtrl.editPersona);
//exportacion del modulo de rutas
module.exports = router;