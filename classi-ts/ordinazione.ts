import { ElementoConQuantita } from "./menu";
import { Cameriere } from "./utente";


export class Ordinazione {
    codice_tavolo: number;
    timestamp: Date;
    evaso: boolean;
    evasaDa: Cameriere
    elementi: ElementoConQuantita[];

    constructor(codice_tavolo: number, timestamp: Date = new Date(), servitaDa : Cameriere, evaso: boolean = false, elementi: ElementoConQuantita[] = []) {
        this.codice_tavolo = codice_tavolo;
        this.timestamp = timestamp;
        this.evasaDa = servitaDa;
        this.evaso = evaso;
        this.elementi = elementi;
    }

    getImporto(): number {
        let importo = 0;
        for (let elemento of this.elementi) {
            importo += elemento.getPrezzo();
        }
        return importo;
    }

}
