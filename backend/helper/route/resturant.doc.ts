import { listaRistoranti } from "./resturantRoutes/listaRistoranti.doc"
import { ROUTE_TAGS } from "../documentation"
export const resturantRoutes ={
    "/resturants":{
        get: listaRistoranti
    },
    "/resturant/{id}":{
        post: {tags: [ROUTE_TAGS.RISTORANTE],security:[{"bearerAuth": []}]} // TODO
    },
    "/resturant":{
        get:{tags: [ROUTE_TAGS.RISTORANTE],security:[{"bearerAuth": []}]}, // TODO
        post:{tags: [ROUTE_TAGS.RISTORANTE],security:[{"bearerAuth": []}]} // TODO
    }
}