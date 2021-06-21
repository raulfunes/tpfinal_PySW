const Rutina = require('../models/rutina')
const rutinaCtrl = {}

rutinaCtrl.getRutinas = async(req, res)=>{
    var rutina = await Rutina.find().populate("ejercicios");
    res.json(rutina);
}

rutinaCtrl.getRutina = async(req, res)=>{
    var rutina = await Rutina.find(
        {asistencia: req.params.asistencia}
    );
    res.json(rutina);
}

rutinaCtrl.createRutina = async(req, res)=>{
    var rutina = new Rutina(req.body);
    try{
        await rutina.save();
        res.json({
            'status': '1',
            'msg': 'Rutina Guardada'
        })
    } catch (error){
        res.json({
            'status': '0',
            'msg': 'Error procesando operacion'
        })
    }
}
rutinaCtrl.editRutina = async (req, res) => {
    const rutina = new Rutina(req.body);
    try {
        await Rutina.updateOne({ _id: req.body._id }, rutina);
        res.json({
            'status': '1',
            'msg': 'Rutina updated'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

rutinaCtrl.deleteRutina = async (req, res) => {
    try {
        await Rutina.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Rutina removed'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = rutinaCtrl;