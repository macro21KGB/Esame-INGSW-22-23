export enum ROUTE_TAGS {
	UTENTE = "Utente",
    RISTORANTE = "Ristorante"
}
import {userRoute} from "./route/user.doc";
import {resturantRoute} from "./route/resturant.doc";
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
            url: "http://170.250.26.70/api",
            description: "Server pubblico in cloud"
        }
    ],
    paths: {
        ...userRoute,
        ...resturantRoute
    }
};

export { swaggerSetup };