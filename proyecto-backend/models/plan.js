const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const PlanSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    dias: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.models.Plan || mongoose.model('Plan', PlanSchema)