import { AddettoAllaCucina, Cameriere } from "./utente";

interface Personale {
	camerieri: Cameriere[];
	addettiAllaCucina: AddettoAllaCucina[];
}

class Ristorante {
	id: number;
	nome: string;
	indirizzo: string;
	telefono: string;
	sitoWeb: string;
	fotoPath: string;
	personale: Personale;

	constructor(
		id: number = 1,
		nome: string,
		indirizzo: string,
		telefono: string,
		sitoWeb: string,
		fotoPath: string = "",
		personale: Personale = { camerieri: [], addettiAllaCucina: [] },
	) {
		this.id = id;
		this.nome = nome;
		this.indirizzo = indirizzo;
		this.telefono = telefono;
		this.sitoWeb = sitoWeb;
		this.fotoPath = fotoPath;
		this.personale = personale;
	}
}
export { Ristorante };