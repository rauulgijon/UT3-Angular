import mongoose from 'mongoose';

const competicionSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, // Ej: "Liga de Verano"
    deporte: { type: String, required: true }, // Ej: "Fútbol"
    nivel: { type: String, default: 'Amateur' }, // Ej: "Nacional"
    temporada: { type: String }, // Ej: "2024/2025"
    premios: { type: String }    // Ej: "Trofeo + 500€"
});

// El tercer parámetro 'competiciones' fuerza el nombre de la colección en MongoDB
export default mongoose.model('Competicion', competicionSchema, 'competiciones');