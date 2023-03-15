import { ElementoConQuantita } from "./menu";


export class Ordinazione {
    codice_tavolo: number;
    timestamp: Date;
    evaso: boolean;
    elementi: ElementoConQuantita[];

    constructor(codice_tavolo: number, timestamp: Date, evaso: boolean, elementi: ElementoConQuantita[]) {
        this.codice_tavolo = codice_tavolo;
        this.timestamp = timestamp;
        this.evaso = evaso;
        this.elementi = elementi;
    }

}
