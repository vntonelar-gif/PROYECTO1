const express = require("express");
const router = express.Router();

const Seccion = require("../models/Seccion");

// Obtener todas las secciones
router.get("/", async (req, res) => {
  try {
    const secciones = await Seccion.find()
      .populate("asignatura")
      .populate("docente")
      .populate("sede")
      .populate("periodoAcademico");

    res.json(secciones);
  } catch (error) {
    console.error("ERROR AL OBTENER SECCIONES:", error);

    res.status(500).json({
      mensaje: "Error al obtener las secciones",
      error: error.message
    });
  }
});

// Crear una sección
router.post("/", async (req, res) => {
  try {
    const nuevaSeccion = new Seccion(req.body);

    const seccionGuardada = await nuevaSeccion.save();

    res.status(201).json(seccionGuardada);
  } catch (error) {
    console.error("ERROR AL CREAR SECCION:", error);

    res.status(400).json({
      mensaje: "Error al crear la sección",
      error: error.message
    });
  }
});

module.exports = router;