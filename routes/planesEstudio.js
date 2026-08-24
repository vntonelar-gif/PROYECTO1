const express = require("express");
const router = express.Router();

const PlanEstudio = require("../models/PlanEstudio");

// Obtener todos los planes de estudio
router.get("/", async (req, res) => {
  try {
    const planes = await PlanEstudio.find().populate("carrera");
    res.json(planes);
  } catch (error) {
    console.error("ERROR AL OBTENER PLANES:", error);

    res.status(500).json({
      mensaje: "Error al obtener los planes de estudio",
      error: error.message
    });
  }
});

// Crear un plan de estudio
router.post("/", async (req, res) => {
  try {
    const nuevoPlan = new PlanEstudio(req.body);
    const planGuardado = await nuevoPlan.save();

    res.status(201).json(planGuardado);
  } catch (error) {
    console.error("ERROR AL CREAR PLAN:", error);

    res.status(400).json({
      mensaje: "Error al crear el plan de estudio",
      error: error.message
    });
  }
});

module.exports = router;