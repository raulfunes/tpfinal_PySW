const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const CuotaSchema = new Schema({
    monto: {
        type: Number,
        required: true
    },
    fecha_pago: {
        type: Date,
        required: true
    },
    mes: {
        type: String,
        required: true
    },
    alumno: {
        type: Schema.Types.ObjectId,
        ref: Alumno,
        required: true
    }
})

module.exports = mongoose.models.Cuota || mongoose.model('Cuota', CuotaSchema)