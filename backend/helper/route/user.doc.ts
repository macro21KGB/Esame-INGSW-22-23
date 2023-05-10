import { login } from "./userRoutes/login.doc"
import { register } from "./userRoutes/register.doc";
import { creaUtenza } from "./userRoutes/creaUtenza.doc";
import { getUtentiRistorante } from "./userRoutes/getUtentiRistorante";
import { ROUTE_TAGS } from "../documentation"
import { getPw } from "./userRoutes/getPw.doc";
import { changePw } from "./userRoutes/changePw.doc";
import { delUser } from "./userRoutes/deleteUtente.doc";
import { editUser } from "./userRoutes/editUser.doc";
import { getUtenteFromId } from "./userRoutes/getUtenteFromId.doc";
export const userRoutes ={
    "/login":{
        post: login
    },
    "/register":{
        post: register
    },
    "/utenza/{id_ristorante}":{
        post: creaUtenza
    },
    "/utenti/{id_ristorante}":{
        get: getUtentiRistorante
    },
    "/utente/{email}":{
        put: editUser,
        delete: delUser
    },
    "/utente/{id}":{
        get:getUtenteFromId
    },
    "/pw-changed":{
        get: getPw
    },
    "/pw-change":{
        post: changePw
    }
}