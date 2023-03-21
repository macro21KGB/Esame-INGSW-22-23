import { Ordinazione } from "./ordinazione";

export class Conto {
    data: Date;
    codice_tavolo: number;
    ordini: Ordinazione[];

    constructor(data: Date = new Date(), codice_tavolo: number, ordini: Ordinazione[] = []) {
        this.data = data;
        this.ordini = ordini;
        this.codice_tavolo = codice_tavolo;
    }

    getImportoTotale(): number {
        let importo = 0;
        for (let ordinazione of this.ordini) {
            importo += ordinazione.getImporto();
        }
        return importo;
    }
}