import { ROUTE_TAGS } from "../../documentation"
const dummy = {
    "success": true,
    "data": [
        {
            "codice_tavolo": "1",
            "timestamp": "2023-04-30T15:18:25.159Z",
            "evasaDa": 1,
            "evaso": true,
            "elementi": [],
            "id": 1
        },
        {
            "codice_tavolo": "1",
            "timestamp": "2023-04-30T15:18:25.161Z",
            "evasaDa": 1,
            "evaso": true,
            "elementi": [],
            "id": 2
        },
        {
            "codice_tavolo": "1",
            "timestamp": "2023-05-02T12:53:01.239Z",
            "evasaDa": 11,
            "evaso": true,
            "elementi": [
                {
                    "nome": "Pasta al pesto",
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
    ]
}
const getOrdinazioniEvase = {
        tags: [ROUTE_TAGS.ORDINAZIONE],
        description: "Ottieni le ordinazioni evase / non evase",
        security: [
            {
               "bearerAuth": []
            }
        ],
        parameters : [
            {
                name: "are_evase",
                in: "path",
                description: "Se questo parametro è true allora vengono ottenute tutte le ordinazioni evase, altrimenti se è false tutte le non evase",
                type: "string",
                example: true
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

export {getOrdinazioniEvase};