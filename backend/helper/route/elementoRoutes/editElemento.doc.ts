import { ROUTE_TAGS } from "../../documentation";
const editElemento = {
    tags: [ROUTE_TAGS.ELEMENTO],
        description: "Modifica un elemento",
        security: [
            {
               "bearerAuth": []
            }
        ],
        parameters : [
            {
                name: "id_elemento",
                in: "path",
                description: "id dell' elemento da modificare",
                type: "string",
                example: "1"
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
                                description: "nome dell'elemento",
                                example: "Pasta al pomodoro"
                            },
                            prezzo : {
                                type: "number",
                                description: "prezzo dell'elemento",
                                example: 5.50
                            },
                            descrizione : {
                                type: "string",
                                description: "descrizione dell'elemento",
                                example: "Classica pasta italiana"
                            },
                            allergeni : {
                                type: "string",
                                description: "Allergeni presenti nell'elemento",
                                example: "Allergene1,Allergene2,Allergene3"
                            },
                            ingredienti : {
                                type: "string",
                                description: "Ingredienti dell'elemento",
                                example: "Pasta,Pomodoro,Olio,Basilico"
                            },
                        }
                    }
                }
            }
        },
        responses: {
            200:{
                description: "Elemento modificato con successo",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Elemento modificato con successo"
                            }
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
};

export {editElemento  };