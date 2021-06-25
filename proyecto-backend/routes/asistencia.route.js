const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const asistenciaCtrl = require('./../controllers/asistencia.controller');
const authCtrl = require('./../controllers/auth.controller')
// definiendo rutas
router.get('/',[authCtrl.verifyToken, authCtrl.isEntrenador], asistenciaCtrl.getAsistencias);
router.get('/alumno/:alumno',authCtrl.verifyToken, asistenciaCtrl.getAsistenciaAlumno);
router.get('/:id',authCtrl.verifyToken, asistenciaCtrl.getAsistencia);
router.post('/',[authCtrl.verifyToken, authCtrl.isEntrenador], asistenciaCtrl.createAsistencia);
router.put('/:id',[authCtrl.verifyToken, authCtrl.isEntrenador], asistenciaCtrl.editAsistencia);
router.delete('/:id',[authCtrl.verifyToken, authCtrl.isEntrenador], asistenciaCtrl.deleteAsistencia);
//exportacion del modulo de rutas
module.exports = router;