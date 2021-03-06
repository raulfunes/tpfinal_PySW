const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const alumnoCtrl = require('./../controllers/alumno.controller');
const authCtrl = require('./../controllers/auth.controller')
// definiendo rutas
router.post('/',[authCtrl.verifyToken, authCtrl.isEntrenador], alumnoCtrl.createAlumno);
router.get('/',authCtrl.verifyToken, alumnoCtrl.getAlumnos);
router.get('/:id',authCtrl.verifyToken, alumnoCtrl.getAlumno);
router.get('/persona/:persona',authCtrl.verifyToken, alumnoCtrl.getAlumnoPersona);
router.put('/:id',[authCtrl.verifyToken, authCtrl.isEntrenador], alumnoCtrl.editAlumno);
router.delete('/:id',[authCtrl.verifyToken, authCtrl.isEntrenador], alumnoCtrl.deleteAlumno);

//exportacion del modulo de rutas
module.exports = router;