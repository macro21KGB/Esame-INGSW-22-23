class Menu {
    private nome: string;
    private categorie: Categoria[];

    constructor(nome: string, categorie: Categoria[]) {
        this.nome = nome;
        this.categorie = categorie;
    }

    public getNome(): string {
        return this.nome;
    }
    
    public getCategorie(): Categoria[] {
        return this.categorie;
    }

}

class Categoria {
    nome: string;
    elementi: ElementoConQuantita[];

    constructor(nome: string, elementi: ElementoConQuantita[]) {
        this.nome = nome;
        this.elementi = elementi;
    }
}


class Elemento {
    nome: string;
    descrizione: string;
    prezzo: number;
    ingredienti: string[];
    allergeni: string[];

    constructor(nome: string, descrizione: string, prezzo: number, ingredienti: string[], allergeni: string[]) {
        this.nome = nome;
        this.descrizione = descrizione;
        this.prezzo = prezzo;
        this.ingredienti = ingredienti;
        this.allergeni = allergeni;
    }

    public getPrezzo(): number {
        return this.prezzo;
    }
}

class ElementoConQuantita extends Elemento {
    quantita: number;

    constructor(nome: string, descrizione: string, prezzo: number, ingredienti: string[], allergeni: string[], quantita: number) {
        super(nome, descrizione, prezzo, ingredienti, allergeni);
        this.quantita = quantita;
    }


    public static fromElemento(elemento: Elemento, quantita: number): ElementoConQuantita {
        return new ElementoConQuantita(elemento.nome, elemento.descrizione, elemento.prezzo, elemento.ingredienti, elemento.allergeni, quantita);
    }

}


export { Menu, Elemento, ElementoConQuantita, Categoria}