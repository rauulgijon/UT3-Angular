import mongoose from 'mongoose';

const equipoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    deporte: { type: String, required: true }, 
    escudo: { type: String }, 
    
});

export default mongoose.model('Equipo', equipoSchema, 'equipos');