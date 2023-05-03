import { ROUTE_TAGS } from "../documentation"
export const contoRoutes ={
    "/conti":{
        get: {tags: [ROUTE_TAGS.CONTO],security:[{"bearerAuth": []}]}, // TODO
    },
    "/conto/{id_conto}":{
        put: {tags: [ROUTE_TAGS.CONTO],security:[{"bearerAuth": []}]}, // TODO
    },
}