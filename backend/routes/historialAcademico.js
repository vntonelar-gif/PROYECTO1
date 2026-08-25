const express = require("express");
const router = express.Router();

const HistorialAcademico = require("../models/HistorialAcademico");

// Obtener todo el historial académico
router.get("/", async (req, res) => {
  try {
    const historial = await HistorialAcademico.find()
      .populate("estudiante")
      .populate("asignatura");

    res.json(historial);
  } catch (error) {
    console.error("ERROR AL OBTENER HISTORIAL:", error);

    res.status(500).json({
      mensaje: "Error al obtener el historial académico",
      error: error.message
    });
  }
});

// Registrar resultado de una asignatura
router.post("/", async (req, res) => {
  try {
    const { estudiante, asignatura, nota, estado } = req.body;

    const registroExistente = await HistorialAcademico.findOne({
      estudiante,
      asignatura
    });

    if (registroExistente) {
      return res.status(400).json({
        mensaje: "Esta asignatura ya está registrada en el historial del estudiante"
      });
    }

    const nuevoRegistro = new HistorialAcademico({
      estudiante,
      asignatura,
      nota,
      estado
    });

    const registroGuardado = await nuevoRegistro.save();

    res.status(201).json(registroGuardado);
  } catch (error) {
    console.error("ERROR AL CREAR HISTORIAL:", error);

    res.status(400).json({
      mensaje: "Error al registrar el historial académico",
      error: error.message
    });
  }
});

module.exports = router;