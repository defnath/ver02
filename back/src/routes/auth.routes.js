import { Router } from "express";
import { login , register, logout, profile, verifyToken } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js"; 

const app = Router();

app.post('/register', validateSchema(registerSchema), register);

app.post('/login', validateSchema(loginSchema), login);

app.post('/logout', logout);

app.get('/verify', verifyToken);

app.get('/profile', authRequired, profile);

export default app;