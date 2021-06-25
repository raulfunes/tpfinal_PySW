const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const rutinaCtrl = require('./../controllers/rutina.controller');
const authCtrl = require('./../controllers/auth.controller')
// definiendo rutas
router.post('/' ,[authCtrl.verifyToken, authCtrl.isEntrenador] , rutinaCtrl.createRutina);
router.get('/' ,authCtrl.verifyToken , rutinaCtrl.getRutinas);
router.get('/:id',authCtrl.verifyToken , rutinaCtrl.getRutina);
router.get('/asistencia/:asistencia' ,authCtrl.verifyToken , rutinaCtrl.getRutinaAsistencia);
router.put('/:id' ,[authCtrl.verifyToken, authCtrl.isEntrenador] , rutinaCtrl.editRutina);
router.delete('/:id',[authCtrl.verifyToken, authCtrl.isEntrenador] , rutinaCtrl.deleteRutina);
//exportacion del modulo de rutas
module.exports = router;