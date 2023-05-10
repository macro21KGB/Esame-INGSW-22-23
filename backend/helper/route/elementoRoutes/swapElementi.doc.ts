import { ROUTE_TAGS } from "../../documentation";
const swapElementi = {
    tags: [ROUTE_TAGS.ELEMENTO],
        description: "Scambia due elementi di ordine",
        security: [
            {
               "bearerAuth": []
            }
        ],
        parameters : [
            {
                name: "id_elemento1",
                in: "path",
                description: "id del primo elemento da scambiare",
                type: "string",
                example: "1"
            },
            {
                name: "id_elemento2",
                in: "path",
                description: "id del secondo elemento da scambiare",
                type: "string",
                example: "2"
            }
        ],
        responses: {
            200:{
                description: "Elemento cancellato con successo",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Elementi scambiati con successo"
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

export {swapElementi};