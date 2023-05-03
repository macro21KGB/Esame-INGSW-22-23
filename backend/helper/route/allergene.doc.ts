import { ROUTE_TAGS } from "../documentation"
export const allergeneRoutes ={
    "/allergene":{
        post: {tags: [ROUTE_TAGS.ALLERGENE],security:[{"bearerAuth": []}]}, // TODO
    },
    "/allergeni/{id_elemento}":{
        get: {tags: [ROUTE_TAGS.ALLERGENE],security:[{"bearerAuth": []}]}, // TODO
    },
    "/allergene/{id_allergene}":{
        delete: {tags: [ROUTE_TAGS.ALLERGENE],security:[{"bearerAuth": []}]}, // TODO
    },
}