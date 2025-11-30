import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Usuario from "./src/app/core/models/User.js";
import Admin from "./src/app/core/models/Admin.js";
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

// Ruta de login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Datos recibidos:", req.body);

  try {
    // Busca en la coleccion "usuarios"
    const user = await Usuario.findOne({ username, password });
    console.log("Resultado de búsqueda:", user);

    res.json({ message: "Login exitoso", user });
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

//Ruta de registro
app.post("/api/registro", async (peticion, respuesta) => {
  // Peticion
  const { username, password, email } = peticion.body;
  console.log("Datos recibidos para registro:", peticion.body)

  // Logica para crear un nuevo usuario
  try {
    const usuarioCreado = new Usuario({
      username: username,
      password: password,
      email: email,
      rol: 'jugador' 
    });

    await usuarioCreado.save(); //save --> guarda en la base de datos
    respuesta.json({ message: "Usuario registrado con éxito", usuarioCreado });

  }catch (error) {
    console.error("Error al registrar usuario:", error);
    respuesta.status(500).json({ 
        mensaje: "Error al registrar el usuario", 
        error: error.message 
    });
  }
});


// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
    