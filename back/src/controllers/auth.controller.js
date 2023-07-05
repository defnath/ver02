import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { createdAccessToken } from "../libs/jwt.js";

// SE CREA EL REGISTRO
export const register = async (req, res) => {
    const { 
        name, lastname, email, password
    } = req.body
    try {
        const userFound = await User.findOne ({
            $or: [
                {email}
            ]
        });
        if (userFound) {
            let errors = [];
            if (userFound.email === email) {
                errors.push("Este correo esta en uso");
            }
            if (errors.length > 0 ) {
                return res.status(400).json(errors);
            }
        }
        
// ENCRIPTAR LA CONTRASEÑA
        const passwordHash = await bcrypt.hash (password, 10)
// REGISTRAR 
        const newUser = new User ({
            name,
            lastname,
            email,
            password:passwordHash,
        });
// GUARDAR MI COOKIE
        const userSaved = await newUser.save();
// CREAR COOKIE
        const token = await createdAccessToken ({id: userSaved._id});
        res.cookie ('token', token)
        res.json ({
            id: userSaved.id,
            name: userSaved.name,
            lastname: userSaved.lastname,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });

    } catch (error) {
        res.status(500).json({message:error.message})
    }
};
// PARA EL INICIO DE SESIÓN
export const login = async (req, res) => {
    const { 
        email, password 
    } = req.body

    try {
        const userFound = await User.findOne ({ email });
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado"});


        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({ message: "Contraseña invalida"});

        const token = await createdAccessToken({id: userFound._id});

        res.cookie('token', token);

        res.json ({
            id: userFound.id,
            name: userFound.name,
            lastname: userFound.lastname,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json ({ message: error.message });
    }

};

// PARA CERRAR SESIÓN
export const logout =  (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
        });
        return res.sendStatus(200);
};

// PARA MOSTAR PERFIL
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: "Nombre de usuario no encontrado"});

    res.json ({
        id: userFound.id,
        name: userFound.name,
        lastname: userFound.lastname,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
};

// PARA VERIFICAR EL TOKEN
export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if (!token) return res.status(401).json({ message: "Unauthorized "});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {

        if (err) return res.status(401).json({ message: "Unauthorized "});

        const userFound = await User.findById(user.id)

        if (!userFound) return res.status(401).json({ message: "Unauthorized "});

        return res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
        });
    });
};
