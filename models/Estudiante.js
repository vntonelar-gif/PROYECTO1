const mongoose = require("mongoose");

const estudianteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Estudiante", estudianteSchema);