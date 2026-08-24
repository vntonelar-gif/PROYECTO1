const express = require("express");
const router = express.Router();

const Asignatura = require("../models/Asignatura");

// Obtener todas las asignaturas
router.get("/", async (req, res) => {
  try {
    const asignaturas = await Asignatura.find()
  .populate("planEstudio")
  .populate("prerrequisitos");
    res.json(asignaturas);
  } catch (error) {
    console.error("ERROR AL OBTENER ASIGNATURAS:", error);

    res.status(500).json({
      mensaje: "Error al obtener las asignaturas",
      error: error.message
    });
  }
});

// Crear una asignatura
router.post("/", async (req, res) => {
  try {
    const nuevaAsignatura = new Asignatura(req.body);

    const asignaturaGuardada = await nuevaAsignatura.save();

    res.status(201).json(asignaturaGuardada);
  } catch (error) {
    console.error("ERROR AL CREAR ASIGNATURA:", error);

    res.status(400).json({
      mensaje: "Error al crear la asignatura",
      error: error.message
    });
  }
});

module.exports = router;