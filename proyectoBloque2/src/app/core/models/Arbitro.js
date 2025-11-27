import e from 'express';
import mongoose from 'mongoose';

const arbitroSchema = new mongoose.Schema({
    
    username: { type:String, required: true, unique:true },
    password: { type:String, required:true },
    email: { type:String, required:true, unique:true },
    name: { type:String, required:false },
    rol: { type:String, enum:['admin', 'jugador', 'arbitro'], default:'arbitro' },
    deporte: { type:String, required:false },
    dni: { type:String, required:false, unique:true },
    telefono: { type:String, required:false }

});

const Arbitro = mongoose.model('Arbitro', arbitroSchema);

export default Arbitro;