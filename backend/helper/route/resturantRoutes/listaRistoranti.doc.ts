import { ROUTE_TAGS } from "../../documentation"
const dummyResturants = JSON.parse("[{\"id\":1,\"nome\":\"Ristorante 1\",\"indirizzo\":\"Via Roma 1\",\"telefono\":\"3333333333\",\"sitoWeb\":\"www.ristorante1.it\",\"fotoPath\":\"foto1.jpg\",\"personale\":{\"camerieri\":[],\"addettiAllaCucina\":[]}}]");
const listaRistoranti = {
        tags: [ROUTE_TAGS.RISTORANTE],
        description: "Lista di tutti i ristoranti di un amministratore",
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
                            example :dummyResturants
                            
                        }
                    }
                }
            },
            400:{
                description:"Devi fornire un token",
                content: {
                    "application/json": {
                        schema : {
                            type : "object",
                            example :{
                                "success": false,
                                "data": "Token not provided"
                            }
                        }
                    }
                }
            },
            403:{
                description:"Accesso consentito solo a un admin",
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

export {listaRistoranti};