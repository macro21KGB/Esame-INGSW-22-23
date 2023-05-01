import { ROUTE_TAGS } from "../documentation"
export const elementoRoutes ={
    "/elementi/{id_categoria}":{
        get: {tags: [ROUTE_TAGS.ELEMENTO],security:[{"bearerAuth": []}]} // TODO
    },
    "/elemento/{id_elemento}":{
        get:{tags: [ROUTE_TAGS.ELEMENTO],security:[{"bearerAuth": []}]}, // TODO
    },
    "/scambia-elementi/{id_elemento1}/{id_elemento2}":{
        put: {tags: [ROUTE_TAGS.ELEMENTO],security:[{"bearerAuth": []}]} // TODO
    },
    "/elemento/:id_elemento":{
        put: {tags: [ROUTE_TAGS.ELEMENTO],security:[{"bearerAuth": []}]}, // TODO
        delete: {tags: [ROUTE_TAGS.ELEMENTO],security:[{"bearerAuth": []}]} // TODO
    },
    "/elemento":{
        post:{tags: [ROUTE_TAGS.ELEMENTO],security:[{"bearerAuth": []}]}, // TODO
    },
}