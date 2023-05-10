import { ROUTE_TAGS } from "../../documentation"
const dummy = [
    {
        "data": "2023-05-10T11:02:20.868Z",
        "ordini": [
            {
                "codice_tavolo": "1",
                "timestamp": "2023-05-10T11:02:20.868Z",
                "evaso": true,
                "elementi": [
                    {
                        "nome": "Pasta al pesto",
                        "descrizione": "",
                        "prezzo": 6,
                        "ingredienti": [],
                        "allergeni": [],
                        "ordine": 0,
                        "id_elemento": 0,
                        "quantita": 2
                    }
                ],
                "id": 3
            }
        ],
        "codice_tavolo": "1",
        "id_conto": 1,
        "chiuso": false
    }
]
const getConti = {
        tags: [ROUTE_TAGS.CONTO],
        description: "Lista di tutti i conti del ristorante",
        security: [
            {
               "bearerAuth": []
            }
        ],
        parameters : [
            {
                name: "id_ristorante",
                in: "path",
                description: "id del ristorante",
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

export {getConti };