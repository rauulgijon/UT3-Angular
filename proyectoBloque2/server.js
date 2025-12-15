import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Importamos los modelos
import Usuario from "./src/app/core/models/User.js";
import Arbitro from "./src/app/core/models/Arbitro.js";
// NUEVOS MODELOS (Asegúrate de que existen, ver paso 2)
import Competicion from "./src/app/core/models/Competicion.js";
import Partido from "./src/app/core/models/Partido.js";

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
// RUTAS DE AUTENTICACIÓN
// ----------------------------------------------------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Usuario.findOne({ username, password });
    if (user) {
        res.json({ message: "Login exitoso", user });
    } else {
        res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno" });
  }
});

app.post("/api/registro", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.json({ message: "Usuario registrado", usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar", error: error.message });
  }
});

// ----------------------------------------------------
// RUTAS DE USUARIOS Y ÁRBITROS
// ----------------------------------------------------
app.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

app.delete("/api/usuarios/:id", async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar" });
  }
});

app.put("/api/usuarios/:id", async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Usuario actualizado", usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar" });
  }
});

app.get("/api/arbitros", async (req, res) => {
  try {
    const listaArbitros = await Usuario.find({ rol: 'arbitro' });
    res.json(listaArbitros);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener árbitros" });
  }
});

app.delete("/api/arbitros/:id", async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ message: "Árbitro eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar" });
  }
});

// ----------------------------------------------------
// RUTAS DE COMPETICIONES (ESTO ES LO QUE FALTABA)
// ----------------------------------------------------
app.get("/api/competiciones", async (req, res) => {
  try {
    const lista = await Competicion.find();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener competiciones" });
  }
});

app.post("/api/competiciones", async (req, res) => {
  try {
    const nueva = new Competicion(req.body);
    await nueva.save();
    res.json({ message: "Competición creada", competicion: nueva });
  } catch (error) {
    res.status(500).json({ message: "Error al crear" });
  }
});

app.put("/api/competiciones/:id", async (req, res) => {
  try {
    const actualizada = await Competicion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Actualizada", competicion: actualizada });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar" });
  }
});

app.delete("/api/competiciones/:id", async (req, res) => {
  try {
    await Competicion.findByIdAndDelete(req.params.id);
    // Opcional: Borrar también los partidos asociados
    await Partido.deleteMany({ competicion: req.params.id });
    res.json({ message: "Competición eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar" });
  }
});

// ----------------------------------------------------
// RUTAS DE PARTIDOS
// ----------------------------------------------------
app.get("/api/partidos/:competicionId", async (req, res) => {
  try {
    const partidos = await Partido.find({ competicion: req.params.competicionId })
                                  .populate('arbitro', 'username');
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener partidos" });
  }
});

app.post("/api/partidos", async (req, res) => {
  try {
    const nuevo = new Partido(req.body);
    await nuevo.save();
    res.json({ message: "Partido creado", partido: nuevo });
  } catch (error) {
    res.status(500).json({ message: "Error al crear" });
  }
});

app.put("/api/partidos/:id", async (req, res) => {
  try {
    const actualizado = await Partido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Partido actualizado", partido: actualizado });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar" });
  }
});

app.delete("/api/partidos/:id", async (req, res) => {
  try {
    await Partido.findByIdAndDelete(req.params.id);
    res.json({ message: "Partido eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar" });
  }
});

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));