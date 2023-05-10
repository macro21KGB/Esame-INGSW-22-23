import { ROUTE_TAGS } from "../../documentation";
const editConto = {
    tags: [ROUTE_TAGS.CONTO],
        description: "Chiude un conto",
        security: [
            {
               "bearerAuth": []
            }
        ],
        parameters : [
            {
                name: "id_conto",
                in: "path",
                description: "id del conto",
                type: "string",
                example: "1"
            }
        ],
        responses: {
            200:{
                description: "Conto modificato con successo",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Conto chiuso con successo"
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

export {editConto};