const express = require("express");
const router = express.Router();

const PeriodoAcademico = require("../models/PeriodoAcademico");

// Obtener todos los períodos académicos
router.get("/", async (req, res) => {
  try {
    const periodos = await PeriodoAcademico.find();
    res.json(periodos);
  } catch (error) {
    console.error("ERROR AL OBTENER PERIODOS:", error);

    res.status(500).json({
      mensaje: "Error al obtener los períodos académicos",
      error: error.message
    });
  }
});

// Crear un período académico
router.post("/", async (req, res) => {
  try {
    const nuevoPeriodo = new PeriodoAcademico(req.body);

    const periodoGuardado = await nuevoPeriodo.save();

    res.status(201).json(periodoGuardado);
  } catch (error) {
    console.error("ERROR AL CREAR PERIODO:", error);

    res.status(400).json({
      mensaje: "Error al crear el período académico",
      error: error.message
    });
  }
});

module.exports = router;