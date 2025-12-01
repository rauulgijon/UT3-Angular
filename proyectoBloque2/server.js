import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Importamos los modelos
import Usuario from "./src/app/core/models/User.js";
import Arbitro from "./src/app/core/models/Arbitro.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("¡¡¡Conectado a MongoDB!!!"))
  .catch(err => console.log("Error MongoDB :(", err));

// ----------------------------------------------------
// RUTAS DE AUTENTICACIÓN (LOGIN Y REGISTRO)
// ----------------------------------------------------

// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Intento de login:", username);

  try {
    const user = await Usuario.findOne({ username, password });
    if (user) {
        res.json({ message: "Login exitoso", user });
    } else {
        res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Registro (Sirve para crear usuarios desde el admin también)
app.post("/api/registro", async (req, res) => {
  const { username, password, email, rol, dni, deporte, telefono } = req.body;
  
  try {
    const nuevoUsuario = new Usuario({
      username,
      password,
      email,
      rol: rol || 'jugador',
      dni,
      deporte,
      telefono
    });

    await nuevoUsuario.save();
    res.json({ message: "Usuario registrado con éxito", usuario: nuevoUsuario });
  } catch (error) {
    console.error("Error registro:", error);
    res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
  }
});

// ----------------------------------------------------
// RUTAS DE GESTIÓN DE USUARIOS
// ----------------------------------------------------

// Obtener todos los usuarios
app.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

// Eliminar un usuario
app.delete("/api/usuarios/:id", async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
});

// ----------------------------------------------------
// RUTAS DE GESTIÓN DE ÁRBITROS (CORREGIDO)
// ----------------------------------------------------

// Obtener usuarios que sean Árbitros
app.get("/api/arbitros", async (req, res) => {
  try {
    // Buscamos en el modelo Usuario, filtrando por rol 'arbitro'
    const listaArbitros = await Usuario.find({ rol: 'arbitro' });
    res.json(listaArbitros);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener árbitros" });
  }
});

// Eliminar un árbitro (usamos el modelo Usuario)
app.delete("/api/arbitros/:id", async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ message: "Árbitro eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar árbitro" });
  }
});

// ----------------------------------------------------
// ARRANQUE DEL SERVIDOR
// ----------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));