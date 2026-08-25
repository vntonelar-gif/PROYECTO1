const mongoose = require("mongoose");

const inscripcionSchema = new mongoose.Schema({
  estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estudiante",
    required: true
  },

  seccion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seccion",
    required: true
  },

  fechaInscripcion: {
    type: Date,
    default: Date.now
  },

  estado: {
    type: String,
    enum: ["Inscrita", "Retirada"],
    default: "Inscrita"
  }
});

const Inscripcion =
  mongoose.models.Inscripcion ||
  mongoose.model("Inscripcion", inscripcionSchema);

module.exports = Inscripcion;