import Incubator from "../models/incubator.models.js";
import axios from 'axios';

// Esta funcion hace que puedas obtener los autos de todas los usuarios en general.
export const getIncubators = async (req, res) => {
  try {
    const incubators = await Incubator.find().lean().exec()
    res.json(incubators);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener las incubadoras" });
  }
};

// Esta funcion hace que puedas obtener los autos del usuario.
// todos
export const getMyIncubators = async (req, res) => {
  try {
    const incubators = await Incubator.find({user:req.user.id}).lean().exec()
    res.json(incubators);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener las incubadoras" });
  }
};

// Esta funcion hace que puedas obtener un auto en especifico del usuario.
// Obtienes solo un auto
export const getIncubator = async (req, res) => {
  try {
    const incubatorId = req.params.id;
    const incubator = await Incubator.findById(incubatorId).lean().exec();

    if (!incubator) {
      return res.status(404).json({ error: 'La incubadora no existe' });
    }
    res.json(incubator);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener la incubadora' });
    console.log(error);
  }
};

// Esta funcion hace que puedas crea un auto.
export const createIncubator = async (req, res ) => {
    try { 
        const { nombre, fecha, alevinos_cant, descripcion,estado } = req.body;
        const newIncubator = new Incubator({
          nombre,
          fecha,
          alevinos_cant,
          descripcion,estado,
          user: req.user.id
        });
        await newIncubator.save();
        res.json(newIncubator);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo crear la incubadora' });
        console.log(error)
    }
};

// Esta funcion hace que puedas actualizes un auto.
export const updateIncubator = async (req, res) => {
  try {
    const { nombre, fecha, alevinos_cant, descripcion,estado } = req.body;

    const incubatorUpdated = await Incubator.findByIdAndUpdate(
      { _id: req.params.id },
      { nombre, fecha, alevinos_cant, descripcion, estado  },
      { new: true }
    );

    return res.json(incubatorUpdated);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar la incubadora ' });
    console.log(error);
  }
};
// Esta funcion hace que puedas elimines un auto.
export const deleteIncubator = async (req, res) => {
  try {
    const deletedIncubator  = await Incubator.findByIdAndDelete(req.params.id);
    if (!deletedIncubator) {
      return res.status(404).json({ error: 'La incubadora no existe' });
    }
    res.json({ message: 'La incubadora eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar la incubadora' });
    console.log(error);
  }
};  
