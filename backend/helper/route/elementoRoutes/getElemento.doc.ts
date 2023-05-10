import { ROUTE_TAGS } from "../../documentation"
const dummy = 
    {
        "nome": "Pasta al pesto",
        "descrizione": "descrizione pasta al pesto",
        "prezzo": 6,
        "ingredienti": "Pasta, pesto",
        "allergeni": [
            {
                "nome": "Glutine",
                "id_elemento": 2,
                "id": 0
            },
            {
                "nome": "Lattosio",
                "id_elemento": 2,
                "id": 0
            }
        ],
        "ordine": 0,
        "id_elemento": 2
    };
const getElemento = {
        tags: [ROUTE_TAGS.ELEMENTO],
        description: "Ottieni un elemento dal suo id",
        security: [
            {
               "bearerAuth": []
            }
        ],
        parameters : [
            {
                name: "id_elemento",
                in: "path",
                description: "id dell'elemento",
                type: "string",
                example: "1"
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

export {getElemento};