import e from 'express';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    
    username: { type:String, required: true, unique:true },
    password: { type:String, required:true },
    email: { type:String, required:true, unique:true },
    name: { type:String, required:false },
    rol: { type:String, enum:['admin', 'jugador', 'arbitro'], default:'jugador' },

    // CAMPOS EXTRA (Opcionales, solo se usarán si es Árbitro)
    dni: { type:String, required:false },
    deporte: { type:String, required:false },
    telefono: { type:String, required:false }

});

export default mongoose.model('Usuario', userSchema, 'usuarios');