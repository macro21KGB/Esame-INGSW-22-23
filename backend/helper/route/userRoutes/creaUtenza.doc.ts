import { ROUTE_TAGS } from "../../documentation";
const creaUtenza = {
    tags: [ROUTE_TAGS.UTENTE],
        description: "Crea l'account di un utente amministratore",
        parameters : [
            {
                name: "id_ristorante",
                in: "path",
                description: "id del ristorante a cui appartiene l'utente",
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
                            ruolo : {
                                type: "string",
                                description: "Ruolo dell'utente",
                                example: "ADMIN"
                            },
                            telefono : {
                                type: "string",
                                description: "Ruolo dell'utente",
                                example: "3445566778"
                            },
                            supervisore : {
                                type: "string",
                                description: "Flag supervisore",
                                example: "false"
                            },
                            email : {
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
                description:"Errore durante la registrazione",
                content: {
                    "application/json": {
                        schema : {
                            type : "object",
                            example :{
                                "success": false,
                                "data": "Errore durante la registrazione"
                            }
                        }
                    }
                }
            },
            403:{
                description:"Accesso consentito solo a un admin",
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

export {creaUtenza};