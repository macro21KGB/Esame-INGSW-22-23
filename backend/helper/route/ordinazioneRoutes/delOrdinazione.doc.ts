import { ROUTE_TAGS } from "../../documentation";
const delOrdinazione = {
    tags: [ROUTE_TAGS.ORDINAZIONE],
        description: "Cancella una ordinazione",
        security: [
            {
               "bearerAuth": []
            }
        ],
        parameters : [
            {
                name: "id_ordinazione",
                in: "path",
                description: "id dell' ordinazione da cancellare",
                type: "string",
                example: "1"
            }
        ],
        responses: {
            200:{
                description: "Ordinazione cancellata con successo",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Ordinazione cancellata con successo"
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

export {delOrdinazione};