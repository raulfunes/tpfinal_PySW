const Usuario = require('./../models/usuario')
const usuarioCtrl = {}
const jwt = require('jsonwebtoken');

usuarioCtrl.createUsuario = async (req, res) => {
    //en req.body se espera que vengan los datos de usuario a crear
    const usuario = new Usuario(req.body);
    try {
        const usu = await Usuario.findOne({
            username: usuario.username
        })
        if (usu.username == usuario.username) {
            res.json({
                'status': '2',
                'msg': 'Nombre de usuario existente'
            })
        }
    } catch {
        try {
            await usuario.save();
            res.json({
                'status': '1',
                'msg': 'Usuario guardado.'
            })
        } catch (error) {
            res.json({
                'status': '0',
                'msg': 'Error procesando operacion.'
            })
        }
    }
}

usuarioCtrl.comprobarNombre = async (req, res)=>{
    try{
        var usuario = await Usuario.findOne({
            username: req.params.nombre
        });
        if (usuario != undefined){
            res.json({
                status:"1"
            });
        }
        else{
            res.json({
                status:"0"
            });
        }
    }
    catch(error){
        res.json({
            status:"0"
        })
    }
}

usuarioCtrl.getUsuario = async (req, res) => {
    var usuario = await Usuario.findOne({
        persona: req.params.persona
    });
    res.json(usuario);
}

usuarioCtrl.loginUsuario = async (req, res) => {
    //en req.body se espera que vengan las credenciales de login
    //defino los criterios de busqueda en base al username y password recibidos
    const criteria = {
        username: req.body.username,
        password: req.body.password
    }
    //el método findOne retorna un objeto que cumpla con los criterios de busqueda
    Usuario.findOne(criteria, function (err, user) {
        //el método findOne retorna un objeto que cumpla con los criterios de busqueda
        if (err) {
            res.json({
                status: 0,
                msg: 'error'
            })
        };
        if (!user) {
            res.json({
                status: 0,
                msg: "not found"
            })
        } else {
            const unToken = jwt.sign({
                id: user._id,
                rol: user.rol
            }, "secretkey");
            res.json({
                status: 1,
                message: "success",
                userid: user._id,
                username: user.username,
                persona: user.persona,
                rol: user.rol,
                token: unToken
            });
        }
    })
}
//exportacion del modulo controlador
module.exports = usuarioCtrl;