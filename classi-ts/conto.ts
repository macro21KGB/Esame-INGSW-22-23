import { Ordinazione } from "./ordinazione";

export class Conto {
    data: Date;
    ordini: Ordinazione[];

    constructor(data: Date = new Date(), ordini: Ordinazione[] = []) {
        this.data = data;
        this.ordini = ordini;
    }

    getImportoTotale(): number {
        let importo = 0;
        for (let ordinazione of this.ordini) {
            importo += ordinazione.getImporto();
        }
        return importo;
    }
}