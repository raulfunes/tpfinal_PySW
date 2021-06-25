//importamos el manejador de token
const jwt = require('jsonwebtoken');
const Rol = require('./../models/rol')
const authCtrl = {}
authCtrl.verifyToken = async (req, res, next) => {
    //las llamadas a la API debieran tener un header authorization
    if (!req.headers.authorization) {
        res.json({
            'status': '0',
            'msg': 'Unauthorized request.'
        })
    }
    //se espera formato -> Bearer XXX, interesa el token en pos(1) del arrayTexto
    var arrayTexto = req.headers.authorization.split(' ');
    var token = null;
    (arrayTexto.length >= 2) ? token = arrayTexto[1]: token = null;
    if (token == null) {
        res.json({
            'status': '0',
            'msg': 'Unauthorized request.'
        });
    } else {
        try {
            const payload = jwt.verify(token, "secretkey");
            //payload retorna la información del user que se uso en el método de login
            req.userId = payload._id;
            req.rol = payload.rol;
            next(); //se pasa a procesar el siguiente método del stack de la peticion
        } catch (error) {
            res.json({
                'status': '0',
                'msg': 'Unauthorized request.'
            });
        }
    }
}

authCtrl.isEntrenador = async(req, res, next) =>{
    const rol = await Rol.findById(req.rol);
    if (rol.descripcion == "Entrenador"){
        next()
        return;
    } else{
        return res.json({
            'msg' : "No eres entrenador"
        })
    }
}
//exportamos el manejador d
module.exports= authCtrl;
