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
	id_categoria: number;
	id_ristorante: number;

	constructor(nome: string, elementi: Elemento[], id_categoria: number = 0, id_ristorante: number = 0) {
		this.nome = nome;
		this.elementi = elementi;
		this.id_categoria = id_categoria;
		this.id_ristorante = id_ristorante;
	}
}

interface OpzioniElemento {
	ingredienti: string[];
	allergeni: Allergene[];
	ordine: number;
}

class Elemento {
	id_elemento: number;
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
		id: number = 0,
	) {
		this.nome = nome;
		this.descrizione = descrizione;
		this.prezzo = prezzo;
		this.ingredienti = opzioni.ingredienti;
		this.allergeni = opzioni.allergeni;
		this.ordine = opzioni.ordine;
		this.id_elemento = id;
	}

	public getOrdine(): number {
		return this.ordine;
	}

	public getPrezzo(): number {
		return this.prezzo;
	}

	public setOrdine(ordine: number): void {
		this.ordine = ordine;
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
export type { OpzioniElemento };
