import { Meta } from "@storybook/react";
import UtenzaItem from ".";
import { InformazioniUtente } from "../../routes/GestisciUtenza";
import { RUOLI } from "../../entities/utente";

const utente: InformazioniUtente = {
    nome: "Mario",
    cognome: "Rossi",
    email: "mario.rossi@gmail.com",
    ruolo: RUOLI.ADMIN,
    supervisore: false,
    telefono: "1234567890",
    password: "password",
}

const utenteAddettoCucina = {
    ...utente,
    ruolo: RUOLI.ADDETTO_CUCINA,
}

const utenteAddettoCameriere = {
    ...utente,
    ruolo: RUOLI.CAMERIERE,
}

const meta: Meta = {
    title: "Components/UtenzaItem",
    component: UtenzaItem,
    args: {
        utente,
        onModifica: () => { },
    }
}

export default meta;

export const UtenteAdmin = {}

export const UtenteAddettoCucina = {
    args: {
        utente: utenteAddettoCucina
    }
}

export const UtenteAddettoCameriere = {
    args: {
        utente: utenteAddettoCameriere
    }
}

export const UtenteSupervisoreCameriere = {
    args: {
        utente: {
            ...utenteAddettoCameriere,
            supervisore: true
        }
    }
}