import { ROUTE_TAGS } from "../documentation"
const dummyResturants = [{
    nome:"pippo",
    id:"1234"
},
{
    nome:"pluto",
    id:"12345"
}]
const listaRistoranti = {
        tags: [ROUTE_TAGS.RISTORANTE],
        description: "Lista di tutti i ristoranti di un amministratore",
        responses: {
            200:{
                description: "OK",
                content: {
                    "application/json": {
                        schema :{
                            type : "object",
                            example :{
                                count: 2,
                                users: dummyResturants
                            }
                        }
                    }
                }
            }
        }
}
const creaRistorante = {
    tags: [ROUTE_TAGS.RISTORANTE],
    description: "Crea un nuovo ristorante",
    
    
}

export const resturantRoute ={
    "/resturants/id":{
        get: listaRistoranti
    },
    "/resturant":{
        post: creaRistorante
    }
}