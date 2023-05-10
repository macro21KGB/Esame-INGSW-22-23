import { ROUTE_TAGS } from "../../documentation";
const creaCategoria = {
    tags: [ROUTE_TAGS.CATEGORIA],
        description: "Crea una nuova categoria",
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
                                description: "nome della categoria",
                                example: "Dolci"
                            },
                            id_ristorante : {
                                type: "number",
                                description: "id del ristorante a cui appartiene la categoria",
                                example: 1
                            },
                        }
                    }
                }
            }
        },
        responses: {
            200:{
                description: "Categoria creata con successo",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Categoria creata con successo"
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

export {creaCategoria};