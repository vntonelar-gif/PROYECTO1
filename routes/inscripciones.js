const express = require("express");
const router = express.Router();

const Inscripcion = require("../models/Inscripcion");
const Matricula = require("../models/Matricula");
const Seccion = require("../models/Seccion");
const BloqueHorario = require("../models/BloqueHorario");
const HistorialAcademico = require("../models/HistorialAcademico");

// Obtener todas las inscripciones
router.get("/", async (req, res) => {
  try {
    const inscripciones = await Inscripcion.find()
      .populate("estudiante")
      .populate({
        path: "seccion",
        populate: [
          { path: "asignatura" },
          { path: "docente" },
          { path: "sede" },
          { path: "periodoAcademico" }
        ]
      });

    res.json(inscripciones);
  } catch (error) {
    console.error("ERROR AL OBTENER INSCRIPCIONES:", error);

    res.status(500).json({
      mensaje: "Error al obtener las inscripciones",
      error: error.message
    });
  }
});

// Crear una inscripción
router.post("/", async (req, res) => {
  try {
    const { estudiante, seccion } = req.body;

    const seccionSeleccionada = await Seccion.findById(seccion)
  .populate({
    path: "asignatura",
    populate: {
      path: "prerrequisitos"
    }
  })
  .populate("periodoAcademico");

    if (!seccionSeleccionada) {
      return res.status(404).json({
        mensaje: "La sección seleccionada no existe"
      });
    }

    // Validar matrícula activa
    const matricula = await Matricula.findOne({
      estudiante,
      periodoAcademico: seccionSeleccionada.periodoAcademico._id,
      estado: "Activa"
    });

    if (!matricula) {
      return res.status(400).json({
        mensaje: "El estudiante no posee matrícula activa para este período"
      });
    }

// Validar prerrequisitos
const asignatura = seccionSeleccionada.asignatura;

if (
  asignatura.prerrequisitos &&
  asignatura.prerrequisitos.length > 0
) {
  for (const prerrequisito of asignatura.prerrequisitos) {

    const idPrerrequisito =
      prerrequisito._id
        ? prerrequisito._id
        : prerrequisito;

    const aprobado = await HistorialAcademico.findOne({
      estudiante: estudiante,
      asignatura: idPrerrequisito,
      estado: "Aprobada"
    });

    if (!aprobado) {
      return res.status(400).json({
        mensaje:
          `No puede inscribir ${asignatura.nombre}. Falta aprobar ${prerrequisito.nombre || "un prerrequisito"}`
      });
    }
  }
}

    // Evitar inscripción duplicada
    const existente = await Inscripcion.findOne({
      estudiante,
      seccion,
      estado: "Inscrita"
    });

    if (existente) {
      return res.status(400).json({
        mensaje: "El estudiante ya está inscrito en esta sección"
      });
    }

    // Validar cupos
    const inscritosActuales = await Inscripcion.countDocuments({
      seccion,
      estado: "Inscrita"
    });

    if (inscritosActuales >= seccionSeleccionada.cupo) {
      return res.status(400).json({
        mensaje: "La sección no tiene cupos disponibles"
      });
    }

    // Validar conflictos de horario
    const bloquesNuevaSeccion = await BloqueHorario.find({ seccion });

    const otrasInscripciones = await Inscripcion.find({
      estudiante,
      estado: "Inscrita"
    });

    for (const inscripcion of otrasInscripciones) {
      const bloquesExistentes = await BloqueHorario.find({
        seccion: inscripcion.seccion
      });

      for (const nuevo of bloquesNuevaSeccion) {
        for (const existente of bloquesExistentes) {
          const mismoDia = nuevo.dia === existente.dia;

          const haySuperposicion =
            nuevo.horaInicio < existente.horaTermino &&
            nuevo.horaTermino > existente.horaInicio;

          if (mismoDia && haySuperposicion) {
            return res.status(400).json({
              mensaje: "La sección presenta conflicto de horario con otra asignatura inscrita"
            });
          }
        }
      }
    }

    const nuevaInscripcion = new Inscripcion({
      estudiante,
      seccion
    });

    const inscripcionGuardada = await nuevaInscripcion.save();

    res.status(201).json(inscripcionGuardada);
  } catch (error) {
    console.error("ERROR AL CREAR INSCRIPCION:", error);

    res.status(400).json({
      mensaje: "Error al crear la inscripción",
      error: error.message
    });
  }
});

module.exports = router;