const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const alumnoCtrl = require('./../controllers/alumno.controller');
// definiendo rutas
router.post('/', alumnoCtrl.createAlumno);
router.get('/', alumnoCtrl.getAlumnos);
router.get('/:id', alumnoCtrl.getAlumno);
router.get('/persona/:persona', alumnoCtrl.getAlumnoPersona);
router.put('/:id', alumnoCtrl.editAlumno);
router.delete('/:id', alumnoCtrl.deleteAlumno);

//exportacion del modulo de rutas
module.exports = router;