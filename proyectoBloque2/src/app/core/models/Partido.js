import mongoose from 'mongoose';

const partidoSchema = new mongoose.Schema({
    local: { type: String, required: true },      // Ej: "Equipo A"
    visitante: { type: String, required: true },  // Ej: "Equipo B"
    fecha: { type: Date },                        // Día del partido
    hora: { type: String },                       // Ej: "20:30"
    resultado: { type: String, default: '-/-' },  // Ej: "2-1" o "-/-" si no se ha jugado
    estado: { type: String, enum: ['Pendiente', 'Jugado', 'Suspendido'], default: 'Pendiente' },
    
    // Relaciones
    arbitro: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, // Relación con el árbitro
    competicion: { type: mongoose.Schema.Types.ObjectId, ref: 'Competicion', required: true } // IMPORTANTE: A qué liga pertenece
});

export default mongoose.model('Partido', partidoSchema, 'partidos');