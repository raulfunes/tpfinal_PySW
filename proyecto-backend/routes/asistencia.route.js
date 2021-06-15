const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const asistenciaCtrl = require('./../controllers/asistencia.controller');
// definiendo rutas
router.post('/', asistenciaCtrl.createAsistencia);
router.get('/', asistenciaCtrl.getAsistencia);
router.put('/:id', asistenciaCtrl.editAsistencia);
router.delete('/:id', asistenciaCtrl.deleteAsistencia);
//exportacion del modulo de rutas
module.exports = router;