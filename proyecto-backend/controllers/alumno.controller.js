const Alumno = require('../models/alumno')
const alumnoCtrl = {}

alumnoCtrl.getAlumno = async(req, res)=>{
    var alumnos = await Alumno.find().populate("persona");
    res.json(alumnos);
}

alumnoCtrl.createAlumno = async(req, res)=>{
    var alumno = new Alumno(req.body);
    try{
        await alumno.save();
        res.json({
            'status': '1',
            'msg': 'Alumno Guardada'
        })
    } catch (error){
        res.json({
            'status': '0',
            'msg': 'Error procesando operacion'
        })
    }
}
alumnoCtrl.editAlumno = async (req, res) => {
    const alumno = new createAlumno(req.body);
    try {
        await Alumno.updateOne({ _id: req.body._id }, alumno);
        res.json({
            'status': '1',
            'msg': 'Alumno updated'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

alumnoCtrl.deleteAlumno= async (req, res) => {
    try {
        await Alumno.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Alumno removed'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = alumnoCtrl;