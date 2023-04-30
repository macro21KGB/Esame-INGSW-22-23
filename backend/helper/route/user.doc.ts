import { log } from "console"
import { ROUTE_TAGS } from "../documentation"


const dummyUsers = [{
    nome:"pippo",
    id:"1234"
},
{
    nome:"pluto",
    id:"12345"
}]
const listaUtenti = {
        tags: [ROUTE_TAGS.UTENTE],
        description: "Lista di tutti gli utenti",
        responses: {
            200:{
                description: "OK",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                count: 2,
                                users: dummyUsers
                            }
                        }
                    }
                }
            }
        }
}

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
const creaUtenza = {

};
export const userRoute ={
    "/users":{
        get: listaUtenti
    },
    "/login":{
        post: login
    },
    "/register":{
        post: register
    },
    "/utenza/:id_ristorante":{
        post: creaUtenza
    },
    "/utenti/:id_ristorante":{
        get: {}
    },
    "/utente/:email":{
        put:{},
        delete:{},
    },
    "/utente/:id":{
        get:{}
    },
    "/pw-changed":{
        get:{}
    },
    "/pw-change":{
        post:{}
    }
}