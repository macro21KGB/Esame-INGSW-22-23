import { editConto } from "./contoRoutes/editConto.doc";
import { getConti } from "./contoRoutes/getConti.doc";

export const contoRoutes ={
    "/conti":{
        get: getConti
    },
    "/conto/{id_conto}":{
        put: editConto
    },
}