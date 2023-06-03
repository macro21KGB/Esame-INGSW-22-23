export enum ROUTE_TAGS {
	UTENTE = "Utente",
    RISTORANTE = "Ristorante",
    CATEGORIA = "Categoria",
    ORDINAZIONE = "Ordinazione",
    ELEMENTO = "Elemento",
    CONTO = "Conto",
    ALLERGENE = "Allergene",
}
import {userRoutes} from "./route/user.doc";
import {resturantRoutes} from "./route/resturant.doc";
import { menuRoutes } from "./route/categoria.doc";
import { ordinazioneRoutes } from "./route/ordinazione.doc";
import { elementoRoutes } from "./route/elemento.doc";
import { contoRoutes } from "./route/conto.doc";
import { allergeneRoutes } from "./route/allergene.doc";
const swaggerSetup = {
    openapi: "3.0.0",
    info: {
        title: "Ratatouille - Documentazione API",
        version: "0.0.1",
        description: "Software gestionale destinato all'uso nel settore della ristorazione.",
    },
    servers :[
        {
            url: "http://localhost:3000/api",
            description: "Server di sviluppo in locale"
        },
        {
            url: "http://209.38.197.162/api",
            description: "Server pubblico in cloud"
        }
    ],
    paths: {
        ...userRoutes,
        ...resturantRoutes,
        ...menuRoutes,
        ...ordinazioneRoutes,
        ...elementoRoutes,
        ...contoRoutes,
        ...allergeneRoutes,
    },
    components: {
        securitySchemes: {
          bearerAuth: {
            type:   'http',
            scheme: 'bearer'
          }
        }
      },
};

export { swaggerSetup };