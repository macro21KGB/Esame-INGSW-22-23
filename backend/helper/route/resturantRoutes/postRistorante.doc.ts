import { ROUTE_TAGS } from "../../documentation";
const creaRistorante = {
    tags: [ROUTE_TAGS.RISTORANTE],
        description: "Crea un nuovo ristorante",
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
                            nome : {
                                type: "string",
                                description: "nome dell ristorante",
                                example: "La bella Napoli"
                            },
                            indirizzo : {
                                type: "string",
                                description: "indirizzo del ristorante",
                                example: "Via Borelli 86"
                            },
                            telefono : {
                                type: "string",
                                description: "Ruolo dell'utente",
                                example: "3445566778"
                            },
                            sitoWeb : {
                                type: "string",
                                description: "Sito web opzionale",
                                example: "www.labellanapoli.it"
                            },
                        }
                    }
                }
            }
        },
        responses: {
            200:{
                description: "Ristorante creato con successo",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Creazione avvenuta con successo"
                            }
                        }
                    }
                }
            },
            400:{
                description:"Errore durante la creazione",
                content: {
                    "application/json": {
                        schema : {
                            type : "object",
                            example :{
                                "success": false,
                                "data": "Errore durante la creazione"
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
            },
        }
};

export {creaRistorante};