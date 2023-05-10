import { ROUTE_TAGS } from "../../documentation";
const delAllergene = {
    tags: [ROUTE_TAGS.ALLERGENE],
        description: "Cancella un allergene",
        security: [
            {
               "bearerAuth": []
            }
        ],
        parameters : [
            {
                name: "id_allergene",
                in: "path",
                description: "id della allergene da cancellare",
                type: "string",
                example: "1"
            }
        ],
        responses: {
            200:{
                description: "Allergene cancellato con successo",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Cancellazione avvenuta con successo"
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

export {delAllergene};