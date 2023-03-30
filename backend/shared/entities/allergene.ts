export class Allergene {
    id_elemento : number;
    nome: string;
    id: number;

    constructor(nome: string,id_elemento: number , id: number = 0) {
        this.nome = nome;
        this.id_elemento = id_elemento;
        this.id = id;
    }
}
