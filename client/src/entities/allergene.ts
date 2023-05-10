export class Allergene {

    id_elemento: number;
    nome: string;

    constructor(nome: string, id?: number) {
        this.nome = nome;
        this.id_elemento = id || 0;
    }
}