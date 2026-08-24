const mongoose = require("mongoose");

const matriculaSchema = new mongoose.Schema({
  estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estudiante",
    required: true
  },

  carrera: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carrera",
    required: true
  },

  planEstudio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlanEstudio",
    required: true
  },

  periodoAcademico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PeriodoAcademico",
    required: true
  },

  fechaMatricula: {
    type: Date,
    default: Date.now
  },

  estado: {
    type: String,
    enum: ["Activa", "Suspendida", "Finalizada"],
    default: "Activa"
  }
});

const Matricula =
  mongoose.models.Matricula ||
  mongoose.model("Matricula", matriculaSchema);

module.exports = Matricula;