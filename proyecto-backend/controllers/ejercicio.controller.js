const Ejercicio = require('../models/ejercicio')
const ejercicioCtrl = {}

ejercicioCtrl.getEjercicio = async(req, res)=>{
    var ejercicio = await Ejercicio.find({
        area_muscular: req.params.musculo,
        funcion: req.params.funcion,
        dificultad: req.params.dificultad
    });
    res.json(ejercicio);
}

ejercicioCtrl.createEjercicio = async(req, res)=>{
    var ejercicio = new Ejercicio(req.body);
    try{
        await ejercicio.save();
        res.json({
            'status': '1',
            'msg': 'Ejercicio Guardado'
        })
    } catch (error){
        res.json({
            'status': '0',
            'msg': 'Error procesando operacion'
        })
    }
}
ejercicioCtrl.editEjercicio = async (req, res) => {
    const ejercicio = new Ejercicio(req.body);
    try {
        await Ejercicio.updateOne({ _id: req.body._id }, ejercicio);
        res.json({
            'status': '1',
            'msg': 'Ejercicio updated'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

ejercicioCtrl.deleteEjercicio = async (req, res) => {
    try {
        await Ejercicio.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Ejercicio removed'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = ejercicioCtrl;