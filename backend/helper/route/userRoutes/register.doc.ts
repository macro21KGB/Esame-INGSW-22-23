import { ROUTE_TAGS } from "../../documentation";
const register = {
    tags: [ROUTE_TAGS.UTENTE],
        description: "Crea l'account di un utente amministratore",
        requestBody:{
            content: {
                "application/json": {
                    schema :{
                        type : "object",
                        properties :{
                            username : {
                                type: "string",
                                description: "email dell'utente",
                                example: "tizio.caio@gmail.com"
                            },
                            password : {
                                type: "string",
                                description: "password dell'utente",
                                example: "123"
                            }
                        }
                    }
                }
            }
        },
        responses: {
            200:{
                description: "Utente registrato con successo",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Registrazione avvenuta con successo"
                            }
                        }
                    }
                }
            },
            400:{
                description:"Utente già esistente",
                content: {
                    "application/json": {
                        schema : {
                            type : "object",
                            example :{
                                "success": false,
                                "data": "Utente già esistente"
                            }
                        }
                    }
                }
            },
        }
}

export {register};