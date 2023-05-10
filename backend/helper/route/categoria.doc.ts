import { creaCategoria } from "./categoryRoutes/creaCategoria.doc"
import { delCategoria } from "./categoryRoutes/delCategoria.doc"
import { editCategoria } from "./categoryRoutes/editCategoria.doc"
import { getCategorieRistorante } from "./categoryRoutes/getCategorieRistorante.doc"
export const menuRoutes ={
    "/categorie/{id_ristorante}":{
        get: getCategorieRistorante
    },
    "/categoria":{
        post:creaCategoria
    },
    "/categoria/{id_categoria}":{
        delete: delCategoria,
        put: editCategoria
    },
}