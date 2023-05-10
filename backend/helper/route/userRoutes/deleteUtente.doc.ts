import { ROUTE_TAGS } from "../../documentation"
const delUser = {
        tags: [ROUTE_TAGS.UTENTE],
        description: "Cancella un utente utilizzando l'email",
        parameters : [
            {
                name: "email",
                in: "path",
                description: "email dell'utente da cancellare",
                type: "string",
                example: "1"
            }
        ],
        security: [
            {
               "bearerAuth": []
            }
        ],
        responses: {
            200:{
                description: "OK",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Utente cancellato"
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
}

export {delUser};