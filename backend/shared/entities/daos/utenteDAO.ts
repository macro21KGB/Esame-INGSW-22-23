

import { Ristorante } from "../ristorante";
import { Utente } from "../utente";

interface IUtenteDAO {
	registraUtente(email: string, password: string): Promise<boolean>;
	accediUtente(email: string, password: string): Promise<Utente | null>;

	getIdUtente(email: string): Promise<number | null>;
	getUtenti(): Promise<Utente[]>;
	getRistoranti(email: string) : Promise<Ristorante[]>;
	promuoviASupervisore(utente: Utente): Promise<Utente>;

	addUtente(utente: Utente): Promise<Utente>;
	updateUtente(utente: Utente): Promise<Utente>;
	deleteUtente(utente: Utente): Promise<Utente>;
}

export type { IUtenteDAO };

