import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rol: { type: String, enum: ['admin', 'jugador', 'arbitro'], default: 'jugador' },
    
    // Tus campos extras
    deporte: { type: String, required: false },
    dni: { type: String, required: false },
    telefono: { type: String, required: false },

    // --- ESTO ES LO QUE FALTABA ---
    equipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo', required: false }
});

export default mongoose.model('Usuario', userSchema, 'usuarios');