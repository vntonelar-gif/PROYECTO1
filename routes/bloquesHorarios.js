const express = require("express");
const router = express.Router();

const BloqueHorario = require("../models/BloqueHorario");
const Seccion = require("../models/Seccion");

// Obtener todos los bloques horarios
router.get("/", async (req, res) => {
  try {
    const bloques = await BloqueHorario.find().populate({
      path: "seccion",
      populate: [
        { path: "asignatura" },
        { path: "docente" },
        { path: "sede" },
        { path: "periodoAcademico" }
      ]
    });

    res.json(bloques);
  } catch (error) {
    console.error("ERROR AL OBTENER BLOQUES:", error);

    res.status(500).json({
      mensaje: "Error al obtener los bloques horarios",
      error: error.message
    });
  }
});

// Crear bloque horario con validación de conflictos
router.post("/", async (req, res) => {
  try {
    const { seccion, dia, horaInicio, horaTermino } = req.body;

    // Validar horas
    if (horaInicio >= horaTermino) {
      return res.status(400).json({
        mensaje: "La hora de inicio debe ser anterior a la hora de término"
      });
    }

    // Buscar la sección que se quiere usar
    const seccionNueva = await Seccion.findById(seccion);

    if (!seccionNueva) {
      return res.status(404).json({
        mensaje: "La sección seleccionada no existe"
      });
    }

    // Buscar otros bloques del mismo día
    const bloquesDelDia = await BloqueHorario.find({ dia }).populate("seccion");

    for (const bloque of bloquesDelDia) {
      if (!bloque.seccion) {
        continue;
      }

      // Detectar si los horarios se superponen
      const haySuperposicion =
        horaInicio < bloque.horaTermino &&
        horaTermino > bloque.horaInicio;

      if (!haySuperposicion) {
        continue;
      }

      // Conflicto de docente
      if (
        bloque.seccion.docente.toString() ===
        seccionNueva.docente.toString()
      ) {
        return res.status(400).json({
          mensaje: "El docente ya tiene otra sección en ese horario"
        });
      }

      // Conflicto de sala
      if (
        bloque.seccion.sala === seccionNueva.sala &&
        bloque.seccion.sede.toString() === seccionNueva.sede.toString()
      ) {
        return res.status(400).json({
          mensaje: "La sala ya está ocupada en ese horario"
        });
      }
    }

    const nuevoBloque = new BloqueHorario({
      seccion,
      dia,
      horaInicio,
      horaTermino
    });

    const bloqueGuardado = await nuevoBloque.save();

    res.status(201).json(bloqueGuardado);
  } catch (error) {
    console.error("ERROR AL CREAR BLOQUE:", error);

    res.status(400).json({
      mensaje: "Error al crear el bloque horario",
      error: error.message
    });
  }
});

module.exports = router;