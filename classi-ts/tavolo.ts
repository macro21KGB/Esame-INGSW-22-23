import { Ordinazione } from "./ordinazione";


// TODO: da rimuovere???
class Tavolo {
    occupato: boolean;
    codice_tavolo: string;
    ordinazioni: Ordinazione[];

    constructor(occupato: boolean, codice_tavolo: string, ordinazioni: Ordinazione[]) {
        this.occupato = occupato;
        this.codice_tavolo = codice_tavolo;
        this.ordinazioni = ordinazioni;
    }

    chiudiTavolo() {
        //TODO : implementare
    }

    stampaConto() {
        //TODO : implementare
    }
}