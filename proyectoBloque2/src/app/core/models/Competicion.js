import mongoose from 'mongoose';

const competicionSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, 
    deporte: { type: String, required: true }, 
    nivel: { type: String, default: 'Amateur' }, 
    temporada: { type: String }, 
    premios: { type: String }    
});

export default mongoose.model('Competicion', competicionSchema, 'competiciones');