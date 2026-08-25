const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  rol: {
    type: String,
    required: true,
    enum: [
      "Administrador",
      "Coordinador Académico",
      "Docente",
      "Estudiante"
    ]
  }
});

module.exports = mongoose.model("Usuario", usuarioSchema);