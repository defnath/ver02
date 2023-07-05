import mongoose from "mongoose";

import { config } from '../settings.js';

const incubatorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        require: true
    }, 
    alevinos_cant: {
        type: Number,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },    
    estado: {
        type: Boolean,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
});

export default mongoose.model('Incubator', incubatorSchema);