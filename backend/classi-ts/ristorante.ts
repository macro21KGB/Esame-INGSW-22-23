import { AddettoAllaCucina, Cameriere } from "./utente";

interface Personale {
    camerieri: Cameriere[];
    addettiAllaCucina: AddettoAllaCucina[];
}

export class Ristorante {
    nome: string;
    indirizzo: string;
    telefono: string;
    sitoWeb: string;
    fotoPath: string;
    personale: Personale;

    constructor(nome: string, indirizzo: string, telefono: string, sitoWeb: string, fotoPath: string, personale: Personale) {
        this.nome = nome;
        this.indirizzo = indirizzo;
        this.telefono = telefono;
        this.sitoWeb = sitoWeb;
        this.fotoPath = fotoPath;
        this.personale = personale;
    }

}