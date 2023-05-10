import { ROUTE_TAGS } from "../../documentation"
const dummy = JSON.parse("{\"nome\":\"Mario\",\"cognome\":\"Rossi\",\"telefono\":\"3333333333\",\"email\":\"mario.rossi@gmail.com\",\"ruolo\":\"ADMIN\",\"_ristoranti\":[]}");
const getUtenteFromId = {
        tags: [ROUTE_TAGS.UTENTE],
        description: "Ottieni un utente dal suo id ristorante",
        parameters : [
            {
                name: "id",
                in: "path",
                description: "id dell'utente",
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
            400:{
                description:"Bad request",
                content: {
                    "application/json": {
                        schema : {
                            type : "object",
                            example :{
                                "success": false,
                                "data": "Bad request"
                            }
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

export {getUtenteFromId  };