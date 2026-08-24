const express = require("express");
const router = express.Router();

const Carrera = require("../models/Carrera");

// Obtener todas las carreras
router.get("/", async (req, res) => {
  try {
    const carreras = await Carrera.find().populate("sede");
    res.json(carreras);
  } catch (error) {
    console.error("ERROR AL OBTENER CARRERAS:", error);

    res.status(500).json({
      mensaje: "Error al obtener las carreras",
      error: error.message
    });
  }
});

// Crear una carrera
router.post("/", async (req, res) => {
  try {
    const nuevaCarrera = new Carrera(req.body);

    const carreraGuardada = await nuevaCarrera.save();

    res.status(201).json(carreraGuardada);
  } catch (error) {
    console.error("ERROR AL CREAR CARRERA:", error);

    res.status(400).json({
      mensaje: "Error al crear la carrera",
      error: error.message
    });
  }
});

module.exports = router;