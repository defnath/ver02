import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";

import { getIncubators, getMyIncubators, getIncubator, createIncubator, updateIncubator, deleteIncubator } from "../controllers/incubator.controller.js";

const ruteo = Router();

//Todas las incubadoras, incluso de los demas
ruteo.get('/incubators', authRequired, getIncubators);
//Todas las incubadoras que tu has creado, que solo tu lo puedes ver y modificar
ruteo.get('/the-incubators', authRequired, getMyIncubators);
//Puede ver la incudarora de cualquiera, para ver los datos a detalle.
ruteo.get('incubator/:id', authRequired, getIncubator);
//Para crear una incubadora
ruteo.post('/incubator', authRequired, createIncubator);
//Para actualizar una incubadora
ruteo.put('/incubator:id', authRequired, updateIncubator);
//Para eliminar ya sabes que.
ruteo.delete('/incubator:id', authRequired, deleteIncubator);


export default ruteo;


