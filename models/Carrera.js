const mongoose = require("mongoose");

const carreraSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  codigo: {
    type: String,
    required: true,
    unique: true
  },

  sede: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sede",
    required: true
  }
});

const Carrera =
  mongoose.models.Carrera || mongoose.model("Carrera", carreraSchema);

module.exports = Carrera;