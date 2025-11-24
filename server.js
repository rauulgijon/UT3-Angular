import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Usuario from "./src/app/core/models/User.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("¡¡¡Conectado a MongoDB!!!"))
  .catch(err => console.log("Error MongoDB :(", err));

// Ruta de login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Datos recibidos:", req.body);

  try {
    // Buscar solo por username y comparar password (mejor para mensajes claros durante desarrollo)
    let user;
    if (useInMemory) {
      user = inMemoryUsers.find(u => u.username === username);
      console.log('Usuario in-memory encontrado:', user ? user.username : null);
    } else {
      user = await Usuario.findOne({ username });
      console.log("Usuario encontrado en DB:", user ? user.username : null);
    }

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // construir un objeto seguro para devolver (sin password)
    const safeUser = {
      _id: user._id,
      username: user.username,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.rol
    };

    res.json({ message: "Login exitoso", user: safeUser });
  } catch (error) {
    console.error("Error durante el login:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Ruta temporal para crear un usuario de prueba (DEV ONLY)
app.post('/api/create-test-user', async (req, res) => {
  const { username, password, name, surname, email, rol } = req.body;
  try {
    if (useInMemory) {
      const exists = inMemoryUsers.find(u => u.username === username);
      if (exists) return res.status(400).json({ message: 'Usuario ya existe' });
      const u = { username, password, name, surname, email, rol: rol || 'jugador' };
      inMemoryUsers.push(u);
      return res.status(201).json({ message: 'Usuario de prueba creado (in-memory)', user: { username: u.username, role: u.rol } });
    }

    const exists = await Usuario.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Usuario ya existe' });
    const u = new Usuario({ username, password, name, surname, email, rol: rol || 'jugador' });
    const saved = await u.save();
    res.status(201).json({ message: 'Usuario de prueba creado', user: { username: saved.username, role: saved.rol } });
  } catch (err) {
    console.error('Error creando usuario de prueba', err);
    res.status(500).json({ message: 'Error interno' });
  }
});

// Ruta de registro
app.post("/api/registro", async (peticion, respuesta) => {
  // Peticion
  const { username, name, surname, email, password } = peticion.body;
  console.log("Datos de registro recibidos:", peticion.body);

  // Logica para crear un nuevo usuario
  try {
    const usuarioCreado = new Usuario({
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: password,
      rol: 'jugador'
    });
    const saved = await usuarioCreado.save(); // Guardar en la base de datos

    const safeUser = {
      _id: saved._id,
      username: saved.username,
      name: saved.name,
      surname: saved.surname,
      email: saved.email,
      role: saved.rol
    };

    respuesta.status(201).json({ message: "Usuario registrado con éxito", user: safeUser });
  } catch (error) {
    console.error("Error durante el registro:", error);
    respuesta.status(500).json({ message: "Error del servidor" });
  }
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
