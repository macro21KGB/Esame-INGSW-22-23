import { ROUTE_TAGS } from "../../documentation";
const dummyElementiConQuantita = [
    {
      "nome": "Pasta al pesto",
      "prezzo": 6,
      "ingredienti": [],
      "allergeni": [],
      "ordine": 0,
      "id_elemento": 0,
      "quantita": 2
    },
    {
        "nome": "Pasta al forno",
        "prezzo": 10.50,
        "ingredienti": [],
        "allergeni": [],
        "ordine": 1,
        "id_elemento": 2,
        "quantita": 1
      }
]
const creaOrdine = {
    tags: [ROUTE_TAGS.ORDINAZIONE],
        description: "Crea un nuovo ordine",
        security: [
            {
               "bearerAuth": []
            }
        ],
        parameters : [
            {
                name: "id_ristorante",
                in: "path",
                description: "id del ristorante a cui appartiene l'ordine",
                type: "string",
                example: "1"
            }
        ],
        requestBody:{
            content: {
                "application/json": {
                    schema :{
                        type : "object",
                        properties :{
                            codiceTavolo : {
                                type: "number",
                                description: "codice del tavolo che ha preso l'ordine",
                                example: 2
                            },
                            id_ristorante : {
                                type: "number",
                                description: "id del ristorante a cui appartiene la categoria",
                                example: 1
                            },
                            elementi : {
                                type: "ElementoConQuantita[]",
                                description: "Elementi ordinati",
                                example: dummyElementiConQuantita
                            },
                        }
                    }
                }
            }
        },
        responses: {
            200:{
                description: "Ordine creato con successo",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                "success": true,
                                "data": "Ordine creato con successo",
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

export {creaOrdine};