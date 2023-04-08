import { Ordinazione } from "./ordinazione";

export class Conto {
    id_conto: number;
    data: Date;
    codice_tavolo: string;
    ordini: Ordinazione[];
    chiuso: boolean;

    constructor(data: Date = new Date(), codice_tavolo: string, ordini: Ordinazione[] = [], id_conto: number = 0, chiuso: boolean = false) {
        this.data = data;
        this.ordini = ordini;
        this.codice_tavolo = codice_tavolo;
        this.id_conto = id_conto;
        this.chiuso = chiuso;
    }

    getImportoTotale(): number {
        let importo = 0;
        for (let ordinazione of this.ordini) {
            importo += ordinazione.getImporto();
        }
        return importo;
    }
}