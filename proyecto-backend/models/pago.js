const mongoose = require('mongoose');
const Alumno = require('./alumno')
const Plan = require('./plan')
const {
    Schema
} = mongoose;


const PagoSchema = new Schema({
    monto: {
        type: Number,
        required: true
    },
    fecha_pago: {
        type: Date,
        required: true
    },
    modo_pago: {
        type: String,
        required: true
    },
    plan: {
        type: Schema.Types.ObjectId,
        ref: Plan,
        required: true
    },
    alumno: {
        type: Schema.Types.ObjectId,
        ref: Alumno,
        required: true
    }
})

module.exports = mongoose.models.Pago || mongoose.model('Pago', PagoSchema)