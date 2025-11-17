import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum:['admin', 'jugador', 'arbitro'], default: 'jugador' }
});

export default mongoose.model('Usuario', userSchema, 'usuarios');