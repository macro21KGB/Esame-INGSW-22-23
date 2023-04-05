import { ElementoConQuantita } from "./menu";
import { Cameriere } from "./utente";

export class Ordinazione {
	id?: number;
	codice_tavolo: string;
	timestamp: Date;
	evasaDa?: number;
	evaso: boolean;
	elementi: ElementoConQuantita[];

	constructor(
		codice_tavolo: string,
		timestamp: Date = new Date(),
		evasaDa?: number,
		evaso: boolean = false,
		elementi: ElementoConQuantita[] = [],
		id: number = -1
	) {
		this.codice_tavolo = codice_tavolo;
		this.timestamp = timestamp;
		this.evasaDa = evasaDa;
		this.evaso = evaso;
		this.elementi = elementi;
		this.id = id;
	}

	getImporto(): number {
		let importo = 0;
		for (let elemento of this.elementi) {
			importo += elemento.getPrezzo();
		}
		return importo;
	}
}
