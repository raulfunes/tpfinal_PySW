const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const EntrenadorSchema = new Schema({
    persona: {
        type: Schema.Types.ObjectId,
        ref: Persona,
        required: true
    }
})

module.exports = mongoose.models.Entrenador || mongoose.model('Entrenador', EntrenadorSchema)