import { ElementoConQuantita } from "./menu";
import { Cameriere } from "./utente";


export class Ordinazione {
    codice_tavolo: number;
    timestamp: Date;
    servitaDa: Cameriere[]
    evaso: boolean;
    elementi: ElementoConQuantita[];

    constructor(codice_tavolo: number, timestamp: Date, servitaDa : Cameriere[] = [], evaso: boolean = false, elementi: ElementoConQuantita[] = []) {
        this.codice_tavolo = codice_tavolo;
        this.timestamp = timestamp;
        this.servitaDa = servitaDa;
        this.evaso = evaso;
        this.elementi = elementi;
    }

}
