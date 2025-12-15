import mongoose from 'mongoose'; // Borra el 'import e from express', no hace falta aquí

const arbitroSchema = new mongoose.Schema({
    
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    
    // AGREGA ESTOS CAMPOS QUE TE FALTAN:
    dni: { type: String, required: false },      // O true si es obligatorio
    telefono: { type: String, required: false }, // O Number si prefieres

    rol: { type: String, enum: ['admin', 'jugador', 'arbitro'], default: 'arbitro' },
    deporte: { type: String, enum: ['Fútbol', 'Brawl Stars', 'Call of Duty'], required: false },

});

const Arbitro = mongoose.model('Arbitro', arbitroSchema);
export default Arbitro;