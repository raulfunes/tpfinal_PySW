const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const EjercicioSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    video:{
        type: String,
        required: true
    },
    funcion:{
        type: String,
        required: true
    },
    repeticiones_promedio:{
        type: Number,
        required: true
    },
    series_promedio:{
        type: Number,
        required: true
    },
    area_muscular:{
        type: String,
        required: true
    },
    dificultad:{
        type: String,
        required: true
    }
})

module.exports = mongoose.models.Ejercicio || mongoose.model('Ejercicio', EjercicioSchema)