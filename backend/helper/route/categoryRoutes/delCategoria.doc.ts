import { ROUTE_TAGS } from "../../documentation";
const delCategoria = {
    tags: [ROUTE_TAGS.CATEGORIA],
        description: "Cancella una categoria",
        security: [
            {
               "bearerAuth": []
            }
        ],
        parameters : [
            {
                name: "id_categoria",
                in: "path",
                description: "id della categoria da cancellare",
                type: "string",
                example: "1"
            }
        ],
        responses: {
            200:{
                description: "Categoria cancellata con successo",
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

export {delCategoria};