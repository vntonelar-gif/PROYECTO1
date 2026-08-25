const mongoose = require("mongoose");

const periodoAcademicoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  fechaInicio: {
    type: Date,
    required: true
  },

  fechaTermino: {
    type: Date,
    required: true
  },

  inicioInscripcion: {
    type: Date,
    required: true
  },

  terminoInscripcion: {
    type: Date,
    required: true
  },

  estado: {
    type: String,
    enum: ["Planificado", "Activo", "Finalizado"],
    default: "Planificado"
  }
});

const PeriodoAcademico =
  mongoose.models.PeriodoAcademico ||
  mongoose.model("PeriodoAcademico", periodoAcademicoSchema);

module.exports = PeriodoAcademico;