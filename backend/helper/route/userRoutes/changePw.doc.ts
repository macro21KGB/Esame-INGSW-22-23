import { ROUTE_TAGS } from "../../documentation";
const changePw = {
    tags: [ROUTE_TAGS.UTENTE],
        description: "Modifica la password",
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
                            password : {
                                type: "string",
                                description: "nuova password dell'utente",
                                example: "123"
                            }
                        }
                    }
                }
            }
        },
        responses: {
            200:{
                description: "Password cambiata con successo",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Password cambiata con successo"
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
            },
        }
};

export {changePw};