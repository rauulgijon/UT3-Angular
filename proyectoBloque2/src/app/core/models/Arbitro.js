import mongoose from 'mongoose'; 

const arbitroSchema = new mongoose.Schema({
    
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    
    dni: { type: String, required: false },      
    telefono: { type: String, required: false }, 

    rol: { type: String, enum: ['admin', 'jugador', 'arbitro'], default: 'arbitro' },
    deporte: { type: String, enum: ['Fútbol', 'Brawl Stars', 'Call of Duty'], required: false },

});

const Arbitro = mongoose.model('Arbitro', arbitroSchema);
export default Arbitro;