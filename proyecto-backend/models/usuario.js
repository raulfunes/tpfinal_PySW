const mongoose = require("mongoose");
const Persona = require('./persona');
const Rol = require('./rol');
const {
    Schema
} = mongoose;
const UsuarioSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    persona: {
        type: Schema.Types.ObjectId,
        ref: Persona,
        required: true
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: Rol,
        required: true
    }
});
//exporto objeto para que pueda ser usado en otros lugares
module.exports = mongoose.model('Usuario', UsuarioSchema);