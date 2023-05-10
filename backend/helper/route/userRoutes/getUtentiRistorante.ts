import { ROUTE_TAGS } from "../../documentation"
const dummy = JSON.parse("[{\"nome\":\"Mario\",\"cognome\":\"Rossi\",\"telefono\":\"3333333333\",\"email\":\"mario.rossi@gmail.com\",\"ruolo\":\"ADMIN\",\"_ristoranti\":[]},{\"nome\":\"Salvatore\",\"cognome\":\"Esposito\",\"telefono\":\"3333333333\",\"email\":\"salvo.espo@gmail.com\",\"ruolo\":\"CAMERIERE\",\"supervisore\":false},{\"nome\":\"Luigi\",\"cognome\":\"Verdi\",\"telefono\":\"3333333333\",\"email\":\"luigi.verdi@gmail.com\",\"ruolo\":\"ADDETTO_CUCINA\",\"supervisore\":true}]");
const getUtentiRistorante = {
        tags: [ROUTE_TAGS.UTENTE],
        description: "Ottieni un utente dal suo id ristorante",
        parameters : [
            {
                name: "id_ristorante",
                in: "path",
                description: "id del ristorante in cui lavore l'utente",
                type: "string",
                example: "1"
            }
        ],
        security: [
            {
               "bearerAuth": []
            }
        ],
        responses: {
            200:{
                description: "OK",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :dummy
                        
                        }
                    }
                }
            },
            403:{
                description:"Accesso non consentito",
                content: {
                    "application/json": {
                        schema : {
                            type : "object",
                            example :{
                                "success": false,
                                "data": "Invalid token"
                            }
                        }
                    }
                }
            }
        }
}

export {getUtentiRistorante  };