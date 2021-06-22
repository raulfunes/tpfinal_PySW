const mongoose = require('mongoose');
const Ejercicio = require('./ejercicio');
const Asistencia = require('./asistencia')
const {
    Schema
} = mongoose;

const RutinaSchema = new Schema({
    ejercicios: [{
        type: Schema.Types.ObjectId,
        ref: Ejercicio,
    }],
    asistencia:{
        type: Schema.Types.ObjectId,
        ref: Asistencia,
        required: true
    }
})

module.exports = mongoose.models.Rutina || mongoose.model('Rutina', RutinaSchema)