const express = require("express");
const router = express.Router();

const Matricula = require("../models/Matricula");

// Obtener todas las matrículas
router.get("/", async (req, res) => {
  try {
    const matriculas = await Matricula.find()
      .populate("estudiante")
      .populate("carrera")
      .populate("planEstudio")
      .populate("periodoAcademico");

    res.json(matriculas);
  } catch (error) {
    console.error("ERROR AL OBTENER MATRICULAS:", error);

    res.status(500).json({
      mensaje: "Error al obtener las matrículas",
      error: error.message
    });
  }
});

// Crear una matrícula
router.post("/", async (req, res) => {
  try {
    const nuevaMatricula = new Matricula(req.body);

    const matriculaGuardada = await nuevaMatricula.save();

    res.status(201).json(matriculaGuardada);
  } catch (error) {
    console.error("ERROR AL CREAR MATRICULA:", error);

    res.status(400).json({
      mensaje: "Error al crear la matrícula",
      error: error.message
    });
  }
});

module.exports = router;