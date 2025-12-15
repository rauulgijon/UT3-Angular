import mongoose from 'mongoose';

const partidoSchema = new mongoose.Schema({
    // CAMBIO: Ahora son referencias (ObjectIds) en lugar de Strings simples
    local: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo', required: true },
    visitante: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo', required: true },
    
    fecha: { type: Date },
    hora: { type: String },
    resultado: { type: String, default: '-/-' },
    estado: { type: String, enum: ['Pendiente', 'Jugado', 'Suspendido'], default: 'Pendiente' },
    
    arbitro: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    competicion: { type: mongoose.Schema.Types.ObjectId, ref: 'Competicion', required: true }
});

export default mongoose.model('Partido', partidoSchema, 'partidos');