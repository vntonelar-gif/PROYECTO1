const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const usuariosRoutes = require("./routes/usuarios");
const sedeRoutes = require("./routes/sede");
const carrerasRoutes = require("./routes/carreras");
const planesEstudioRoutes = require("./routes/planesEstudio");
const asignaturasRoutes = require("./routes/asignaturas");
const periodosAcademicosRoutes = require("./routes/periodosAcademicos");
const matriculasRoutes = require("./routes/matriculas");
const seccionesRoutes = require("./routes/secciones");
const bloquesHorariosRoutes = require("./routes/bloquesHorarios");
const inscripcionesRoutes = require("./routes/inscripciones");
const historialAcademicoRoutes = require("./routes/historialAcademico");
require("dotenv").config();

const Estudiante = require("./models/Estudiante");
const Docente = require("./models/Docente");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/sedes", sedeRoutes);
app.use("/api/carreras", carrerasRoutes);
app.use("/api/planes-estudio", planesEstudioRoutes);
app.use("/api/asignaturas", asignaturasRoutes);
app.use("/api/periodos-academicos", periodosAcademicosRoutes);
app.use("/api/matriculas", matriculasRoutes);
app.use("/api/secciones", seccionesRoutes);
app.use("/api/bloques-horarios", bloquesHorariosRoutes);
app.use("/api/inscripciones", inscripcionesRoutes);
app.use("/api/historial-academico", historialAcademicoRoutes);

// Página principal
app.get("/", (req, res) => {
    res.send("Servidor de Gestión Académica funcionando correctamente");
});


// Obtener todos los estudiantes
app.get("/api/estudiantes", async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los estudiantes"
        });
    }
});


// Crear un estudiante
app.post("/api/estudiantes", async (req, res) => {
    try {
        const nuevoEstudiante = new Estudiante(req.body);

        const estudianteGuardado = await nuevoEstudiante.save();

        res.status(201).json(estudianteGuardado);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al crear el estudiante",
            error: error.message
        });
    }
});

// Obtener todos los docentes
app.get("/api/docentes", async (req, res) => {
    try {
        const docentes = await Docente.find();
        res.json(docentes);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los docentes"
        });
    }
});


// Crear un docente
app.post("/api/docentes", async (req, res) => {
    try {
        const nuevoDocente = new Docente(req.body);

        const docenteGuardado = await nuevoDocente.save();

        res.status(201).json(docenteGuardado);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al crear el docente",
            error: error.message
        });
    }
});

// Conexión con MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB conectado correctamente");

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al conectar con MongoDB:", error);
    });