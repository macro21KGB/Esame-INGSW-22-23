import { Ordinazione } from "./ordinazione";

export class Conto {
    data: Date;
    codice_tavolo: string;
    ordini: Ordinazione[];

    constructor(data: Date = new Date(), codice_tavolo: string, ordini: Ordinazione[] = []) {
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

    getTotaleElementi(): number {
        let totale = 0;
        for (let ordinazione of this.ordini) {
            totale += ordinazione.getTotaleElementi();
        }
        return totale;
    }


    public static fromContoJSON(json: Conto) {
        return new Conto(
            json.data,
            json.codice_tavolo,
            json.ordini.map(ordinazione => Ordinazione.fromOrdinazioneJSON(ordinazione))
        );
    }
}