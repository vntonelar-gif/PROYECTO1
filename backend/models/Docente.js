const mongoose = require("mongoose");

const docenteSchema = new mongoose.Schema({
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
    especialidad: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Docente", docenteSchema);