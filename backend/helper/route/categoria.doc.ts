import { ROUTE_TAGS } from "../documentation"
export const menuRoutes ={
    "/categorie/{id_ristorante}":{
        get: {tags: [ROUTE_TAGS.MENU],security:[{"bearerAuth": []}]} // TODO
    },
    "/categoria":{
        post:{tags: [ROUTE_TAGS.MENU],security:[{"bearerAuth": []}]}, // TODO
    },
    "/categoria/{id_categoria}":{
        delete: {tags: [ROUTE_TAGS.MENU],security:[{"bearerAuth": []}]}, // TODO
        put: {tags: [ROUTE_TAGS.MENU],security:[{"bearerAuth": []}]} // TODO
    },
}