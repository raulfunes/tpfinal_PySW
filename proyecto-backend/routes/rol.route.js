const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const rolCtrl = require('./../controllers/rol.controller');
const authCtrl = require('./../controllers/auth.controller')
// definiendo rutas
router.post('/' ,[authCtrl.verifyToken, authCtrl.isEntrenador] , rolCtrl.createRol);
router.get('/', rolCtrl.getRoles);
router.get('/:id', rolCtrl.getRol);
router.put('/:id',[authCtrl.verifyToken, authCtrl.isEntrenador] , rolCtrl.editRol);
router.delete('/:id',[authCtrl.verifyToken, authCtrl.isEntrenador] , rolCtrl.deleteRol);
//exportacion del modulo de rutas
module.exports = router;