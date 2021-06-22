const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const PersonaSchema = new Schema({
    apellido: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    fecha_nac: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
    domicilio: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.models.Persona || mongoose.model('Persona', PersonaSchema)