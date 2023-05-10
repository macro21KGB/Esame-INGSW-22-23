import { creaAllergene } from "./allergeneRoutes/creaAllergene.doc"
import { delAllergene } from "./allergeneRoutes/delAllergene.doc"
import { getAllergeniElemento } from "./allergeneRoutes/getAllergeni"
export const allergeneRoutes ={
    "/allergene":{
        post: creaAllergene
    },
    "/allergeni/{id_elemento}":{
        get: getAllergeniElemento
    },
    "/allergene/{id_allergene}":{
        delete: delAllergene
    },
}