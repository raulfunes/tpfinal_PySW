const Asistencia = require('../models/asistencia')
const asistenciaCtrl = {}


asistenciaCtrl.getAsistencias = async(req, res)=>{
    const asistencias = await Asistencia.find().sort({fecha:-1});
    res.json(asistencias);
}

asistenciaCtrl.getAsistenciaAlumno = async(req, res)=>{
    const asistencias = await Asistencia.find({
        alumno: req.params.alumno
    });
    res.json(asistencias);
}

asistenciaCtrl.getAsistencia = async(req, res)=>{
    const asistencias = await Asistencia.findById(req.params.id);
    res.json(asistencias);
}



asistenciaCtrl.createAsistencia = async(req, res)=>{
    var asistencia = new Asistencia(req.body);
    try{
        await asistencia.save();
        res.json({
            'status': '1',
            'msg': 'Asistencia Guardada'
        })
    } catch (error){
        res.json({
            'status': '0',
            'msg': 'Error procesando operacion'
        })
    }
}
asistenciaCtrl.editAsistencia = async (req, res) => {
    const asistencia = new Asistencia(req.body);
    try {
        await Asistencia.updateOne({ _id: req.body._id }, asistencia);
        res.json({
            'status': '1',
            'msg': 'Asistencia updated'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

asistenciaCtrl.deleteAsistencia= async (req, res) => {
    try {
        await Asistencia.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Asistencia removed'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = asistenciaCtrl;