import { ROUTE_TAGS } from "../../documentation"
const dummy = JSON.parse("[{\"nome\":\"Primi\",\"elementi\":[],\"id_categoria\":1,\"id_ristorante\":1},{\"nome\":\"Secondi\",\"elementi\":[],\"id_categoria\":2,\"id_ristorante\":1},{\"nome\":\"Contorni\",\"elementi\":[],\"id_categoria\":3,\"id_ristorante\":1},{\"nome\":\"Bevande\",\"elementi\":[],\"id_categoria\":4,\"id_ristorante\":1},{\"nome\":\"Dolci\",\"elementi\":[],\"id_categoria\":5,\"id_ristorante\":1}]");
const getCategorieRistorante = {
        tags: [ROUTE_TAGS.CATEGORIA],
        description: "Lista di tutte le categorie del menu di un ristorante",
        security: [
            {
               "bearerAuth": []
            }
        ],
        parameters : [
            {
                name: "id_ristorante",
                in: "path",
                description: "id del ristorante a cui appartiene la categoria",
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

export {getCategorieRistorante };