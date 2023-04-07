import { ElementoConQuantita } from "./menu";

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
		id: number = -1,
	) {
		this.codice_tavolo = codice_tavolo;
		this.timestamp = timestamp;
		this.evasaDa = evasaDa;
		this.evaso = evaso;
		this.elementi = elementi;
		this.id = id;
	}

	setElementi(elementi: ElementoConQuantita[]) {
		this.elementi = elementi;
		return this;
	}

	setEvasaDa(evasaDa: number) {
		this.evasaDa = evasaDa;
		return this;
	}

	getTotaleElementi(): number {
		return this.elementi.length;
	}

	getImporto(): number {
		let importo = 0;
		for (let elemento of this.elementi) {
			importo += elemento.prezzo * elemento.quantita;
		}
		return importo;
	}

	public static fromOrdinazioneJSON(json: Ordinazione) {
		return new Ordinazione(
			json.codice_tavolo,
			json.timestamp,
			json.evasaDa,
			json.evaso,
			json.elementi,
			json.id
		);
	}
}
