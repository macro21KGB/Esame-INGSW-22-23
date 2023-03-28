import { Allergene } from "./allergene";

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
	elementi: Elemento[];
	ordine: number;

	constructor(nome: string, elementi: Elemento[], ordine: number = 0) {
		this.nome = nome;
		this.elementi = elementi;
		this.ordine = ordine;
	}
}

interface OpzioniElemento {
	ingredienti: string[];
	allergeni: Allergene[];
	ordine: number;
}

class Elemento {
	nome: string;
	descrizione: string;
	prezzo: number;
	ingredienti: string[];
	allergeni: Allergene[];
	ordine: number;

	constructor(
		nome: string,
		descrizione: string,
		prezzo: number,
		opzioni: OpzioniElemento,
	) {
		this.nome = nome;
		this.descrizione = descrizione;
		this.prezzo = prezzo;
		this.ingredienti = opzioni.ingredienti;
		this.allergeni = opzioni.allergeni;
		this.ordine = opzioni.ordine;
	}

	public getOrdine(): number {
		return this.ordine;
	}

	public getPrezzo(): number {
		return this.prezzo;
	}

	public getAllergeni(): Allergene[] {
		return this.allergeni;
	}
}

class ElementoConQuantita extends Elemento {
	quantita: number;

	constructor(
		nome: string,
		descrizione: string,
		prezzo: number,
		ingredienti: string[],
		allergeni: Allergene[],
		quantita: number,
	) {
		super(nome, descrizione, prezzo, {
			ingredienti,
			allergeni,
			ordine: 0,
		});
		this.quantita = quantita;
	}

	public static fromElemento(
		elemento: Elemento,
		quantita: number,
	): ElementoConQuantita {
		return new ElementoConQuantita(
			elemento.nome,
			elemento.descrizione,
			elemento.prezzo,
			elemento.ingredienti,
			elemento.allergeni,
			quantita,
		);
	}
}

export { Menu, Elemento, ElementoConQuantita, Categoria };