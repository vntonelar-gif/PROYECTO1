const mongoose = require("mongoose");

const bloqueHorarioSchema = new mongoose.Schema({
  seccion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seccion",
    required: true
  },

  dia: {
    type: String,
    enum: [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado"
    ],
    required: true
  },

  horaInicio: {
    type: String,
    required: true
  },

  horaTermino: {
    type: String,
    required: true
  }
});

const BloqueHorario =
  mongoose.models.BloqueHorario ||
  mongoose.model("BloqueHorario", bloqueHorarioSchema);

module.exports = BloqueHorario;