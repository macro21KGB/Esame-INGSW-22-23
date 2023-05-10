import { listaRistoranti } from "./resturantRoutes/listaRistoranti.doc"
import { getResturant } from "./resturantRoutes/getRistorante.doc"
import { getFirstResturant } from "./resturantRoutes/getFirstRistorante.doc"
import { creaRistorante } from "./resturantRoutes/postRistorante.doc"
export const resturantRoutes ={
    "/resturants":{
        get: listaRistoranti
    },
    "/resturant/{id_ristorante}":{
        get: getResturant
    },
    "/resturant":{
        get: getFirstResturant,
        post: creaRistorante
    }
}