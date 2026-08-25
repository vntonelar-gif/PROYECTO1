const express = require("express");
const router = express.Router();

const Usuario = require("../models/Usuario");

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al obtener usuarios"
    });
  }
});

// Registrar un usuario
router.post("/", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);

    const usuarioGuardado = await nuevoUsuario.save();

    res.status(201).json(usuarioGuardado);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      mensaje: "Error al registrar usuario"
    });
  }
});

// Iniciar sesión
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Correo o contraseña incorrectos"
      });
    }

    if (usuario.password !== password) {
      return res.status(401).json({
        mensaje: "Correo o contraseña incorrectos"
      });
    }

    res.json({
      mensaje: "Inicio de sesión correcto",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al iniciar sesión"
    });
  }
});

module.exports = router;