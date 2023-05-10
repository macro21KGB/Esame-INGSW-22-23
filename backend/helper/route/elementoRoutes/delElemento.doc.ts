import { ROUTE_TAGS } from "../../documentation";
const delElemento = {
    tags: [ROUTE_TAGS.ELEMENTO],
        description: "Cancella un elemento",
        security: [
            {
               "bearerAuth": []
            }
        ],
        parameters : [
            {
                name: "id_elemento",
                in: "path",
                description: "id dell' elemento da cancellare",
                type: "string",
                example: "1"
            }
        ],
        responses: {
            200:{
                description: "Elemento cancellato con successo",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Elemento cancellato con successo"
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

export {delElemento};