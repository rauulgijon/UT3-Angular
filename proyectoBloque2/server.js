import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ----------------------------------------------------
// IMPORTACIÓN DE MODELOS
// ----------------------------------------------------
import Usuario from "./src/app/core/models/User.js";
import Arbitro from "./src/app/core/models/Arbitro.js";
import Competicion from "./src/app/core/models/Competicion.js";
import Partido from "./src/app/core/models/Partido.js";
// IMPORTANTE: Faltaba esta línea en tu archivo
import Equipo from "./src/app/core/models/Equipo.js";

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
    // Populamos equipo para que el frontend sepa si el usuario ya tiene club
    const user = await Usuario.findOne({ username, password }).populate('equipo');
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
// RUTAS DE USUARIOS
// ----------------------------------------------------
app.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate('equipo');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

// Ruta para asignar equipo a un usuario (Fichaje)
app.put("/api/usuarios/:id/asignar-equipo", async (req, res) => {
  try {
    const { equipoId } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id, 
      { equipo: equipoId }, 
      { new: true }
    ).populate('equipo');
    
    res.json({ message: "Equipo asignado", usuario });
  } catch (error) {
    res.status(500).json({ message: "Error al asignar equipo" });
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

// ----------------------------------------------------
// RUTAS DE ÁRBITROS
// ----------------------------------------------------
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
// RUTAS DE EQUIPOS (NUEVAS)
// ----------------------------------------------------
app.get("/api/equipos", async (req, res) => {
  try {
    const lista = await Equipo.find();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener equipos" });
  }
});

app.post("/api/equipos", async (req, res) => {
  try {
    const nuevo = new Equipo(req.body);
    await nuevo.save();
    res.json({ message: "Equipo creado", equipo: nuevo });
  } catch (error) {
    res.status(500).json({ message: "Error al crear equipo" });
  }
});

// ----------------------------------------------------
// RUTAS DE COMPETICIONES
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
    await Partido.deleteMany({ competicion: req.params.id });
    res.json({ message: "Competición eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar" });
  }
});

// ----------------------------------------------------
// RUTAS DE PARTIDOS
// ----------------------------------------------------

// Ruta específica para que el árbitro vea SUS partidos
app.get("/api/partidos/arbitro/:id", async (req, res) => {
  try {
    const partidos = await Partido.find({ arbitro: req.params.id })
      .populate('local', 'nombre escudo')
      .populate('visitante', 'nombre escudo');
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener partidos del árbitro" });
  }
});
app.get("/api/partidos/:competicionId", async (req, res) => {
  try {
    // IMPORTANTE: Como has cambiado Partido.js para usar referencias,
    // usamos populate para traer los nombres reales.
    const partidos = await Partido.find({ competicion: req.params.competicionId })
                                  .populate('arbitro', 'username')
                                  .populate('local', 'nombre escudo')
                                  .populate('visitante', 'nombre escudo');
    res.json(partidos);
  } catch (error) {
    console.error(error); // Para ver error en consola si falla
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