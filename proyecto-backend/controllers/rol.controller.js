const Rol = require('../models/rol')
const rolCtrl = {}

rolCtrl.getRoles = async(req, res)=>{
    var rol = await Rol.find();
    res.json(rol);
}

rolCtrl.getRol = async(req, res)=>{
    var rol = await Rol.findById(req.params.id);
    res.json(rol);
}

rolCtrl.createRol = async(req, res)=>{
    var rol = new Rol(req.body);
    try{
        await rol.save();
        res.json({
            'status': '1',
            'msg': 'Rol Guardado'
        })
    } catch (error){
        res.json({
            'status': '0',
            'msg': 'Error procesando operacion'
        })
    }
}
rolCtrl.editRol = async (req, res) => {
    const rol = new Rol(req.body);
    try {
        await Rol.updateOne({ _id: req.body._id }, rol);
        res.json({
            'status': '1',
            'msg': 'Rol updated'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

rolCtrl.deleteRol= async (req, res) => {
    try {
        await Rol.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Rol removed'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = rolCtrl;