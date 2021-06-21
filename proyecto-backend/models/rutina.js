const mongoose = require('mongoose');
const Ejercicio = require('./ejercicio');
const Asistencia = require('./asistencia')
const {
    Schema
} = mongoose;

const RutinaSchema = new Schema({
    area_muscular: {
        type: String,
        required: true
    },
    ejercicios: [{
        type: Schema.Types.ObjectId,
        ref: Ejercicio,
    }],
    funcion: {
        type: String,
        required: true
    },
    dificultad: {
        type: String,
        required: true
    },
    asistencia:{
        type: Schema.Types.ObjectId,
        ref: Asistencia,
        required: true
    }
})

module.exports = mongoose.models.Rutina || mongoose.model('Rutina', RutinaSchema)