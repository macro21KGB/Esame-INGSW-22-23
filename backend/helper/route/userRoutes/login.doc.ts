import { ROUTE_TAGS } from "../../documentation"
const login = {
    tags: [ROUTE_TAGS.UTENTE],
        description: "Autorizza l'utente accedere al sistema restituendo un token",
        requestBody:{
            content: {
                "application/json": {
                    schema :{
                        type : "object",
                        properties :{
                            username : {
                                type: "string",
                                description: "email dell'utente",
                                example: "mario.rossi@gmail.com"
                            },
                            password : {
                                type: "string",
                                description: "password dell'utente",
                                example: "mario"
                            }
                        }
                    }
                }
            }
        },
        responses: {
            200:{
                description: "Utente autorizzato",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": {
                                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6Ik1hcmlvIiwiY29nbm9tZSI6IlJvc3NpIiwiZW1haWwiOiJtYXJpby5yb3NzaUBnbWFpbC5jb20iLCJydW9sbyI6IkFETUlOIiwic3VwZXJ2aXNvcmUiOmZhbHNlLCJpYXQiOjE2ODI4NzYxNTEsImV4cCI6MTY4Mjg3OTc1MX0.xwE-Z-N3FlfTxf6UF12JEJaiFcmexSAyxKFaTL5fxXg",
                                    "ruolo": "ADMIN",
                                    "supervisore": false
                                }
                            }
                        }
                    }
                }
            },
            401:{
                description:"Utente non autorizzato",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "message": "Invalid credentials"
                            }
                        }
                    }
                }
            },
            400: {
                description:"Errori nella richiesta",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "message": "Bad request"
                            }
                        }
                    }
                }
            }
        }
}

export {login};