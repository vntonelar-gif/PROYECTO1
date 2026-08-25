const mongoose = require("mongoose");

const planEstudioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  anio: {
    type: Number,
    required: true
  },

  carrera: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carrera",
    required: true
  },

  estado: {
    type: String,
    enum: ["Vigente", "Inactivo"],
    default: "Vigente"
  }
});

const PlanEstudio =
  mongoose.models.PlanEstudio ||
  mongoose.model("PlanEstudio", planEstudioSchema);

module.exports = PlanEstudio;