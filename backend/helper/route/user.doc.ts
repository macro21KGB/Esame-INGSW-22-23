import { login } from "./userRoutes/login.doc"
import { register } from "./userRoutes/register.doc";
import { creaUtenza } from "./userRoutes/creaUtenza.doc";
import { ROUTE_TAGS } from "../documentation"
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
        get: {tags: [ROUTE_TAGS.UTENTE],security:[{"bearerAuth": []}]} // TODO
    },
    "/utente/{email}":{
        put:{tags: [ROUTE_TAGS.UTENTE],security:[{"bearerAuth": []}]}, // TODO
        delete:{tags: [ROUTE_TAGS.UTENTE],security:[{"bearerAuth": []}]}, // TODO
    },
    "/utente/{id}":{
        get:{tags: [ROUTE_TAGS.UTENTE],security:[{"bearerAuth": []}]} // TODO
    },
    "/pw-changed":{
        get:{tags: [ROUTE_TAGS.UTENTE],security:[{"bearerAuth": []}]}// TODO
    },
    "/pw-change":{
        post:{tags: [ROUTE_TAGS.UTENTE],security:[{"bearerAuth": []}]} // TODO
    }
}