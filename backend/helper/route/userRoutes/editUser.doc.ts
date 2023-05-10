import { ROUTE_TAGS } from "../../documentation"
const editUser = {
        tags: [ROUTE_TAGS.UTENTE],
        description: "Modifica un utente utilizzando l'email",
        parameters : [
            {
                name: "email",
                in: "path",
                description: "email dell'utente da modificare",
                type: "string",
                example: "1"
            }
        ],
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
                                description: "nome dell'utente",
                                example: "mario"
                            },
                            cognome : {
                                type: "string",
                                description: "cognome dell'utente",
                                example: "rossi"
                            },
                            telefono : {
                                type: "string",
                                description: "Ruolo dell'utente",
                                example: "3445566778"
                            }
                        }
                    }
                }
            }
        },
        responses: {
            200:{
                description: "OK",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Utente aggiornato"
                            }
                        
                        }
                    }
                }
            },
            400:{
                description:"Errore durante la modifica",
                content: {
                    "application/json": {
                        schema : {
                            type : "object",
                            example :{
                                "success": false,
                                "data": "Errore durante la modifica"
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

export {editUser};