const Persona = require('../models/persona')
const personaCtrl = {}

personaCtrl.getPersonas = async(req, res)=>{
    var persona = await Persona.find().populate("rol");
    res.json(persona);
}
personaCtrl.getPersona = async(req, res)=>{
    var persona = await Persona.findById(req.params.id);
    res.json(persona);
}

personaCtrl.createPersona = async(req, res)=>{
    var persona = new Persona(req.body);
    try{
        await persona.save();
        res.json({
            'status': '1',
            'msg': 'Persona Guardada',
            'id': persona._id
        })
    } catch (error){
        res.json({
            'status': '0',
            'msg': 'Error procesando operacion'
        })
    }
}
personaCtrl.editPersona = async (req, res) => {
    const persona = new Persona(req.body);
    try {
        await Persona.updateOne({ _id: req.body._id }, persona);
        res.json({
            'status': '1',
            'msg': 'Persona updated'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

personaCtrl.deletePersona = async (req, res) => {
    try {
        await Persona.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Persona removed'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = personaCtrl;