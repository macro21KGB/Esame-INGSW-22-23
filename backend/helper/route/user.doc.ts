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

export const userRoute ={
    "/users":{
        get: listaUtenti
    }
}