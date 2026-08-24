const mongoose = require("mongoose");

const historialAcademicoSchema = new mongoose.Schema({
  estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estudiante",
    required: true
  },

  asignatura: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Asignatura",
    required: true
  },

  nota: {
    type: Number,
    required: true,
    min: 1,
    max: 7
  },

  estado: {
    type: String,
    enum: ["Aprobada", "Reprobada"],
    required: true
  }
});

const HistorialAcademico =
  mongoose.models.HistorialAcademico ||
  mongoose.model("HistorialAcademico", historialAcademicoSchema);

module.exports = HistorialAcademico;