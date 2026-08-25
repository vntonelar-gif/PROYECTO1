const express = require("express");
const router = express.Router();

const Sede = require("../models/Sede");

// Obtener todas las sedes
router.get("/", async (req, res) => {
  try {
    const sedes = await Sede.find();
    res.json(sedes);
  } catch (error) {
    console.error("ERROR AL OBTENER SEDES:", error);

    res.status(500).json({
      mensaje: "Error al obtener las sedes",
      error: error.message
    });
  }
});

// Crear una sede
router.post("/", async (req, res) => {
  try {
    const nuevaSede = new Sede(req.body);

    const sedeGuardada = await nuevaSede.save();

    res.status(201).json(sedeGuardada);
  } catch (error) {
    console.error("ERROR AL CREAR SEDE:", error);

    res.status(400).json({
      mensaje: "Error al crear la sede",
      error: error.message
    });
  }
});

module.exports = router;