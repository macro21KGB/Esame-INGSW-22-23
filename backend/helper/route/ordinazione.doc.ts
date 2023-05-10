import { ROUTE_TAGS } from "../documentation"
export const ordinazioneRoutes ={
    "/ordina/{id_ristorante}":{
        post: {tags: [ROUTE_TAGS.ORDINAZIONE],security:[{"bearerAuth": []}]} // TODO
    },
    "/ordinazioni/evase/":{
        post:{tags: [ROUTE_TAGS.ORDINAZIONE],security:[{"bearerAuth": []}]}, // TODO
    },
    "/ordinazioni/{is_evase}":{
        get: {tags: [ROUTE_TAGS.ORDINAZIONE],security:[{"bearerAuth": []}]} // TODO
    },
    "/ordinazione/{id_ordinazione}":{
        get: {tags: [ROUTE_TAGS.ORDINAZIONE],security:[{"bearerAuth": []}]} // TODO
    },
}