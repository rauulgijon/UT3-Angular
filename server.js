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
    const user = await Usuario.findOne({ username, password});
    console.log("Resultado de busqueda:", user);

    res.json({ message: "Login exitoso", user });
  } catch (error) {
    console.error("Error durante el login:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
