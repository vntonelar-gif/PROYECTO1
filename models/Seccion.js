const mongoose = require("mongoose");

const seccionSchema = new mongoose.Schema({
  asignatura: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Asignatura",
    required: true
  },

  docente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Docente",
    required: true
  },

  sede: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sede",
    required: true
  },

  jornada: {
    type: String,
    enum: ["Diurna", "Vespertina"],
    required: true
  },

  modalidad: {
    type: String,
    enum: ["Presencial", "Online", "Híbrida"],
    required: true
  },

  cupo: {
    type: Number,
    required: true,
    min: 1
  },

  sala: {
    type: String,
    required: true
  },

  periodoAcademico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PeriodoAcademico",
    required: true
  },

  estado: {
    type: String,
    enum: ["Abierta", "Cerrada"],
    default: "Abierta"
  }
});

const Seccion =
  mongoose.models.Seccion ||
  mongoose.model("Seccion", seccionSchema);

module.exports = Seccion;