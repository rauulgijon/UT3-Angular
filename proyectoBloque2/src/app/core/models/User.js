import e from 'express';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    
    username: { type:String, required: true, unique:true },
    password: { type:String, required:true },
    email: { type:String, required:true, unique:true },
    rol: { type:String, enum:['admin', 'jugador', 'arbitro'], default:'jugador' },
    deporte: { type:String, enum:['Fútbol', 'Brawl Stars', 'Call of Duty'], required:false },
    dni: { type:String, required:false },
    telefono: { type:String, required:false },

});

export default mongoose.model('Usuario', userSchema, 'usuarios');