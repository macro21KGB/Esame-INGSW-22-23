import { ROUTE_TAGS } from "../../documentation";
const creaAllergene = {
    tags: [ROUTE_TAGS.ALLERGENE],
        description: "Crea un nuovo allergene",
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
                                description: "nome dell'allergene",
                                example: "Glutine"
                            },
                            id_ristorante : {
                                type: "number",
                                description: "id dell'elemento a cui appartiene",
                                example: 1
                            },
                        }
                    }
                }
            }
        },
        responses: {
            200:{
                description: "Allergene creato con successo",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Allergene creato con successo"
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

export {creaAllergene};