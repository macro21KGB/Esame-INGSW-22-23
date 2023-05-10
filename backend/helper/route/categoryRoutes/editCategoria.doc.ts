import { ROUTE_TAGS } from "../../documentation";
const editCategoria = {
    tags: [ROUTE_TAGS.CATEGORIA],
        description: "Modifica una categoria",
        security: [
            {
               "bearerAuth": []
            }
        ],
        parameters : [
            {
                name: "id_categoria",
                in: "path",
                description: "id della categoria da modificare",
                type: "string",
                example: "1"
            }
        ],
        responses: {
            200:{
                description: "Categoria modificata con successo",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Modifica avvenuta con successo"
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

export {editCategoria};