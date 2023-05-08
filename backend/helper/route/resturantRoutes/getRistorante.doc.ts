import { ROUTE_TAGS } from "../../documentation"
const dummyResturant = JSON.parse("{\"id\":1,\"nome\":\"Ristorante 1\",\"indirizzo\":\"Via Roma 1\",\"telefono\":\"3333333333\",\"sitoWeb\":\"www.ristorante1.it\"}");
const getResturant = {
        tags: [ROUTE_TAGS.RISTORANTE],
        description: "Ottieni un ristorante dal suo id",
        parameters : [
            {
                name: "id_ristorante",
                in: "path",
                description: "id del ristorante da trovare",
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
                            example :dummyResturant
                        
                        }
                    }
                }
            },
            404:{
                description:"Ristorante non trovato",
                content: {
                    "application/json": {
                        schema : {
                            type : "object",
                            example :{
                                "message": "nessun ristorante con questo id"
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

export {getResturant };