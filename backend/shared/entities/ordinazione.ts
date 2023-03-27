import { ElementoConQuantita } from "./menu";
import { Cameriere } from "./utente";

export class Ordinazione {
	codice_tavolo: string;
	timestamp: Date;
	evasaDa?: Cameriere;
	evaso: boolean;
	elementi: ElementoConQuantita[];

	constructor(
		codice_tavolo: string,
		timestamp: Date = new Date(),
		evasaDa?: Cameriere,
		evaso: boolean = false,
		elementi: ElementoConQuantita[] = [],
	) {
		this.codice_tavolo = codice_tavolo;
		this.timestamp = timestamp;
		this.evasaDa = evasaDa;
		this.evaso = evaso;
		this.elementi = elementi;
	}

	getImporto(): number {
		let importo = 0;
		for (let elemento of this.elementi) {
			importo += elemento.getPrezzo();
		}
		return importo;
	}
}
