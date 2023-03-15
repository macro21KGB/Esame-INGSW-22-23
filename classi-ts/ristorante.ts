import { AddettoAllaCucina, Cameriere } from "./utenti";

export class Ristorante {
    nome: string;
    indirizzo: string;
    telefono: string;
    sitoWeb: string;
    fotoPath: string;
    camerieri: Cameriere[];
    addettiAllaCucina: AddettoAllaCucina[];

    constructor(nome: string, indirizzo: string, telefono: string, sitoWeb: string, fotoPath: string, camerieri: Cameriere[], addettiAllaCucina: AddettoAllaCucina[]) {
        this.nome = nome;
        this.indirizzo = indirizzo;
        this.telefono = telefono;
        this.sitoWeb = sitoWeb;
        this.fotoPath = fotoPath;
        this.camerieri = camerieri;
        this.addettiAllaCucina = addettiAllaCucina;
    }

}