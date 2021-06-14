const mongoose = require("mongoose");
const Alumno = require('./alumno');
const {
    Schema
} = mongoose;
const AsistenciaSchema = new Schema({
    alumno: {
        type: Schema.Types.ObjectId,
        ref: Alumno,
        required: true
    },
    dias_restantes: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
    
});
//exporto objeto para que pueda ser usado en otros lugares
module.exports = mongoose.model('Asistencia', AsistenciaSchema);