const mongoose = require("mongoose");

const asignaturaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  codigo: {
    type: String,
    required: true,
    unique: true
  },

  creditos: {
    type: Number,
    required: true
  },

  semestre: {
    type: Number,
    required: true
  },

  planEstudio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlanEstudio",
    required: true
  },

  prerrequisitos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asignatura"
    }
  ]
});

const Asignatura =
  mongoose.models.Asignatura ||
  mongoose.model("Asignatura", asignaturaSchema);

module.exports = Asignatura;