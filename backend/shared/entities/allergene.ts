export class Allergene {
    id : number;
    nome: string;

    constructor(nome: string, id: number = 0) {
        this.nome = nome;
        this.id = id;
    }
}
