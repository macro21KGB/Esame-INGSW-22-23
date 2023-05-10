import { creaOrdine } from "./ordinazioneRoutes/creaOrdine.doc"
import { delOrdinazione } from "./ordinazioneRoutes/delOrdinazione.doc"
import { filterOrdiniByDate } from "./ordinazioneRoutes/filterDataOrdinazioni.doc"
import { getOrdinazioniEvase } from "./ordinazioneRoutes/getOrdinazioniEvase"
export const ordinazioneRoutes ={
    "/ordina/{id_ristorante}":{
        post: creaOrdine
    },
    "/ordinazioni/evase/":{
        post: filterOrdiniByDate
    },
    "/ordinazioni/{are_evase}":{
        get: getOrdinazioniEvase
    },
    "/ordinazione/{id_ordinazione}":{
        delete: delOrdinazione
    },
}