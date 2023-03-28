import { Ristorante } from "./ristorante";

// questa interfaccia serve per indicare che un utente può essere un supervisore
// nel nostro caso solo l'admin non può essere un supervisore
interface ICanBeSupervisor extends Utente {
	supervisore: boolean;
}

export enum RUOLI {
	ADMIN = "ADMIN",
	ADDETTO_CUCINA = "ADDETTO_CUCINA",
	CAMERIERE = "CAMERIERE",
}
interface IUtenteAbstractFactory {
	createUtente(): Utente;
}

class AdminFactory implements IUtenteAbstractFactory {
	nome: string;
	cognome: string;
	telefono: string;
	email: string;
	ruolo?: RUOLI;

	constructor(
		nome: string,
		cognome: string,
		telefono: string,
		email: string,
		ruolo: RUOLI = RUOLI.ADMIN,
	) {
		this.nome = nome;
		this.cognome = cognome;
		this.telefono = telefono;
		this.email = email;
		this.ruolo = ruolo;
	}


	createUtente(): Utente {
		return new Admin(this.nome, this.cognome, this.telefono, this.email);
	}
}

class CameriereFactory implements IUtenteAbstractFactory {
	nome: string;
	cognome: string;
	telefono: string;
	email: string;
	ruolo?: RUOLI;
	supervisore: boolean;

	constructor(
		nome: string,
		cognome: string,
		telefono: string,
		email: string,
		ruolo: RUOLI = RUOLI.CAMERIERE,
		supervisore: boolean = false,
	) {
		this.nome = nome;
		this.cognome = cognome;
		this.telefono = telefono;
		this.email = email;
		this.ruolo = ruolo;
		this.supervisore = supervisore;
	}

	createUtente(): Utente {
		return new Cameriere(this.nome, this.cognome, this.telefono, this.email, this.supervisore);
	}
}

class AddettoCucinaFactory implements IUtenteAbstractFactory {
	nome: string;
	cognome: string;
	telefono: string;
	email: string;
	ruolo?: RUOLI;
	supervisore: boolean;

	constructor(
		nome: string,
		cognome: string,
		telefono: string,
		email: string,
		ruolo: RUOLI = RUOLI.ADDETTO_CUCINA,
		supervisore: boolean = false,
	) {
		this.nome = nome;
		this.cognome = cognome;
		this.telefono = telefono;
		this.email = email;
		this.ruolo = ruolo;
		this.supervisore = supervisore;
	}
	createUtente(): Utente {
		return new AddettoAllaCucina(this.nome, this.cognome, this.telefono, this.email, this.supervisore);
	}
}

class UtenteFactory {
	public static creaUtente(nome: string, cognome: string, telefono: string, email: string, ruolo: RUOLI, supervisore: boolean = false) : Utente {
		if (ruolo === RUOLI.ADMIN) {
			return new Admin(nome, cognome, telefono, email);
		} else if (ruolo === RUOLI.ADDETTO_CUCINA) {
			return new AddettoAllaCucina(nome, cognome, telefono, email, supervisore);
		} else if (ruolo === RUOLI.CAMERIERE) {
			return new Cameriere(nome, cognome, telefono, email, supervisore);
		}
		throw new Error("Ruolo non valido");
	}
	public static getUtente(factory : IUtenteAbstractFactory){
		return factory.createUtente();
	}
}

abstract class Utente {
	nome: string;
	cognome: string;
	telefono: string;
	email: string;
	ruolo?: RUOLI;

	constructor(
		nome: string,
		cognome: string,
		telefono: string,
		email: string,
		ruolo: RUOLI = RUOLI.ADMIN,
	) {
		this.nome = nome;
		this.cognome = cognome;
		this.telefono = telefono;
		this.email = email;
		this.ruolo = ruolo;
	}

	public static fromJson(jsonText: string): Utente {
		const json = JSON.parse(jsonText);
		// ritorna utente utilizzando le factory
		if(json.ruolo === RUOLI.ADMIN){
			return UtenteFactory.getUtente(new AdminFactory(json.nome, json.cognome, json.telefono, json.email));
		}
		else if(json.ruolo === RUOLI.CAMERIERE){
			return UtenteFactory.getUtente(new CameriereFactory(json.nome, json.cognome, json.telefono, json.email));
		}
		else if(json.ruolo === RUOLI.ADDETTO_CUCINA){
			return UtenteFactory.getUtente(new AddettoCucinaFactory(json.nome, json.cognome, json.telefono, json.email));
		}
		throw new Error("Ruolo non valido");
	}

}

class Admin extends Utente {
	private _ristoranti: Ristorante[];

	setRistoranti(ristoranti: Ristorante[]) {
		this._ristoranti = ristoranti;
	}

	getRistoranti(): Ristorante[] {
		return this._ristoranti;
	}

	constructor(nome: string, cognome: string, telefono: string, email: string) {
		super(nome, cognome, telefono, email);
		this._ristoranti = [];
		this.ruolo = RUOLI.ADMIN;
	}

	
}

class Cameriere extends Utente implements ICanBeSupervisor {
	supervisore: boolean;

	constructor(
		nome: string,
		cognome: string,
		telefono: string,
		email: string,
		supervisore: boolean,
	) {
		super(nome, cognome, telefono, email);
		this.supervisore = supervisore;
		this.ruolo = RUOLI.CAMERIERE;
	}
}

class AddettoAllaCucina extends Utente implements ICanBeSupervisor {
	supervisore: boolean;

	constructor(
		nome: string,
		cognome: string,
		telefono: string,
		email: string,
		supervisore: boolean,
	) {
		super(nome, cognome, telefono, email);
		this.supervisore = supervisore;
		this.ruolo = RUOLI.ADDETTO_CUCINA;
	}
}

export { Utente, Admin, Cameriere, AddettoAllaCucina, RUOLI as Ruolo, UtenteFactory, AdminFactory, CameriereFactory, AddettoCucinaFactory };
