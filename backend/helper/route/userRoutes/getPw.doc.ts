import { ROUTE_TAGS } from "../../documentation"
const dummy = "false"
const getPw = {
        tags: [ROUTE_TAGS.UTENTE],
        description: "Restituisce un valore booleano che indica se la password è stata cambiata o meno",
        security: [
            {
               "bearerAuth": []
            }
        ],
        responses: {
            200:{
                description: "OK",
                content: {
                    "application/json": {
                        schema :{
                            type : "string",
                            example :dummy
                        
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

export {getPw };