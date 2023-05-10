import { ROUTE_TAGS } from "../../documentation"
const dummy = [
    {
        "numero_ordinazioni": "2",
        "giorno": "2023-04-08T22:00:00.000Z"
    }
]
const filterOrdiniByDate = {
        tags: [ROUTE_TAGS.ORDINAZIONE],
        description: "Ottieni gli ordini di un utente in una determinata data",
        security: [
            {
               "bearerAuth": []
            }
        ],
        requestBody:{
            content: {
                "application/json": {
                    schema :{
                        type : "object",
                        properties :{
                            emailUtente : {
                                type: "string",
                                description: "email dell'utente che ha evaso gli ordini",
                                example: "mario.rossi@gmail.com"
                            },
                            dataInizio : {
                                type: "string",
                                description: "Data di inizio per il filtraggio degli ordini",
                                example: "2023-01-05"
                            },
                            dataFine : {
                                type: "string",
                                description: "Data di fine per il filtraggio degli ordini",
                                example: "2023-06-10"
                            },
                        }
                    }
                }
            }
        },
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
            },
        }
}

export {filterOrdiniByDate};