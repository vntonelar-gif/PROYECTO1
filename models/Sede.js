const mongoose = require("mongoose");

const sedeSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  direccion: {
    type: String,
    required: true
  },

  ciudad: {
    type: String,
    required: true
  }
});

const Sede = mongoose.models.Sede || mongoose.model("Sede", sedeSchema);

module.exports = Sede;