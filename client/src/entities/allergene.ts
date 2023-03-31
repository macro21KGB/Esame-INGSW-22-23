export class Allergene {

    id: number;
    nome: string;

    constructor(nome: string, id?: number) {
        this.nome = nome;
        this.id = id || 0;
    }
}