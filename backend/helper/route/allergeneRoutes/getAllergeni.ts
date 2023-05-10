import { ROUTE_TAGS } from "../../documentation"
const dummy = JSON.parse("[{\"nome\":\"Glutine\",\"id_elemento\":2,\"id\":1},{\"nome\":\"Lattosio\",\"id_elemento\":2,\"id\":2}]");
const getAllergeniElemento = {
        tags: [ROUTE_TAGS.ALLERGENE],
        description: "Lista di tutti gli allergeni di un elemento",
        security: [
            {
               "bearerAuth": []
            }
        ],
        parameters : [
            {
                name: "id_elemento",
                in: "path",
                description: "id dell'elemento a cui appartengono gli allergeni",
                type: "string",
                example: "1"
            }
        ],
        responses: {
            200:{
                description: "OK",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :dummy
                            
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
}

export {getAllergeniElemento };