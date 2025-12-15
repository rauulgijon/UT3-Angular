import mongoose from 'mongoose';

const equipoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    deporte: { type: String, required: true }, // Ej: "Fútbol", para filtrar
    escudo: { type: String }, // URL de la imagen (opcional por ahora)
    // Opcional: Capitán, ciudad, etc.
});

// Forzamos que la colección se llame 'equipos'
export default mongoose.model('Equipo', equipoSchema, 'equipos');