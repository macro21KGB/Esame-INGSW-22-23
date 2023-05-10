import { creaElemento } from "./elementoRoutes/creaElemento.doc"
import { delElemento } from "./elementoRoutes/delElemento.doc"
import { editElemento } from "./elementoRoutes/editElemento.doc"
import { getElementibyCategoria } from "./elementoRoutes/getElementibyCategoria.doc"
import { getElemento } from "./elementoRoutes/getElemento.doc"
import { swapElementi } from "./elementoRoutes/swapElementi.doc"
export const elementoRoutes ={
    "/elementi/{id_categoria}":{
        get: getElementibyCategoria
    },
    "/elemento/{id_elemento}":{
        get: getElemento,
        put: editElemento,
        delete: delElemento
    },
    "/scambia-elementi/{id_elemento1}/{id_elemento2}":{
        put: swapElementi
    },
    "/elemento":{
        post: creaElemento
    },
}