const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const alumnoCtrl = require('./../controllers/alumno.controller');
// definiendo rutas
router.post('/', alumnoCtrl.createAlumno);
router.get('/', alumnoCtrl.getAlumno);
router.put('/:id', alumnoCtrl.editAlumno);
router.delete('/:id', alumnoCtrl.deleteAlumno);

//exportacion del modulo de rutas
module.exports = router;