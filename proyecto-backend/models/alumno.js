const mongoose = require('mongoose');
const Persona = require('./persona');
const Plan = require('./plan');
const {
    Schema
} = mongoose;

const AlumnoSchema = new Schema({
    persona: {
        type: Schema.Types.ObjectId,
        ref: Persona,
        required: true
    },
    plan:{
        type: Schema.Types.ObjectId,
        ref: Plan,
        required: true
    },
    fecha_inicio: {
        type: String,
        required: true
    },
})

module.exports = mongoose.models.Alumno || mongoose.model('Alumno', AlumnoSchema)