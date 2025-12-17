import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ----------------------------------------------------
// IMPORTACIÓN DE MODELOS
// ----------------------------------------------------
import Usuario from "./src/app/core/models/User.js";
import Competicion from "./src/app/core/models/Competicion.js";
import Partido from "./src/app/core/models/Partido.js";
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


// ==========================================
//  FUNCIÓN MÁGICA: Buscar o Crear Equipo
// ==========================================
async function buscarOCrearEquipo(nombre) {
    if (!nombre) return null;
    
    // 1. Limpiamos espacios y buscamos sin importar mayúsculas
    const nombreLimpio = nombre.trim();
    let equipo = await Equipo.findOne({ 
        nombre: { $regex: new RegExp(`^${nombreLimpio}$`, 'i') } 
    });

    // 2. Si existe, devolvemos su ID
    if (equipo) {
        return equipo._id;
    }

    // 3. Si no existe, lo creamos
    console.log(`✨ Creando equipo nuevo automáticamente: ${nombreLimpio}`);
    equipo = new Equipo({ 
        nombre: nombreLimpio,
        escudo: '' 
    });
    await equipo.save();
    return equipo._id;
}


// ----------------------------------------------------
// RUTAS DE AUTENTICACIÓN
// ----------------------------------------------------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
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

app.put("/api/usuarios/:id", async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Usuario actualizado", usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar" });
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

// ----------------------------------------------------
// RUTAS DE ÁRBITROS (Usuario con rol='arbitro')
// ----------------------------------------------------
app.get("/api/arbitros", async (req, res) => {
  try {
    const listaArbitros = await Usuario.find({ rol: 'arbitro' });
    res.json(listaArbitros);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener árbitros" });
  }
});

// ----------------------------------------------------
// RUTAS DE EQUIPOS
// ----------------------------------------------------
app.get("/api/equipos", async (req, res) => {
  try {
    const lista = await Equipo.find();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener equipos" });
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
// RUTAS DE PARTIDOS (Con lógica de equipos automática)
// ----------------------------------------------------

app.get("/api/partidos/arbitro/:id", async (req, res) => {
  try {
    const partidos = await Partido.find({ arbitro: req.params.id })
      .populate('local', 'nombre escudo')
      .populate('visitante', 'nombre escudo')
      .populate('competicion', 'nombre');
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener partidos del árbitro" });
  }
});

app.get("/api/partidos/:competicionId", async (req, res) => {
  try {
    const partidos = await Partido.find({ competicion: req.params.competicionId })
                                  .populate('arbitro', 'username')
                                  .populate('local', 'nombre escudo')
                                  .populate('visitante', 'nombre escudo');
    res.json(partidos);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Error al obtener partidos" });
  }
});

// CREAR PARTIDO (Busca o crea equipos)
app.post("/api/partidos", async (req, res) => {
  try {
    const { local, visitante, fecha, hora, arbitro, competicion } = req.body;

    // Resolvemos los IDs de los equipos (creándolos si hace falta)
    const localId = await buscarOCrearEquipo(local);
    const visitanteId = await buscarOCrearEquipo(visitante);

    const nuevo = new Partido({
        local: localId,
        visitante: visitanteId,
        fecha,
        hora,
        arbitro,
        competicion,
        resultado: '-/-',
        estado: 'Pendiente'
    });

    await nuevo.save();
    res.json({ message: "Partido creado", partido: nuevo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear", error: error.message });
  }
});

// EDITAR PARTIDO (También permite cambiar nombres de equipo)
app.put("/api/partidos/:id", async (req, res) => {
  try {
    const datos = { ...req.body };

    // Si vienen nombres de equipos, recalcular IDs
    if (datos.local) datos.local = await buscarOCrearEquipo(datos.local);
    if (datos.visitante) datos.visitante = await buscarOCrearEquipo(datos.visitante);

    const actualizado = await Partido.findByIdAndUpdate(req.params.id, datos, { new: true });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));