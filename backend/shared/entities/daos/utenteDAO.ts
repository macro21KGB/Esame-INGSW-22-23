

import { Utente } from "../utente";

interface IUtenteDAO {
	registraUtente(email: string, password: string): Promise<boolean>;
	accediUtente(email: string, password: string): Promise<Utente | null>;

	getUtente(email: string, password: string): Promise<Utente>;
	getUtenti(): Promise<Utente[]>;

	promuoviASupervisore(utente: Utente): Promise<Utente>;

	addUtente(utente: Utente): Promise<Utente>;
	updateUtente(utente: Utente): Promise<Utente>;
	deleteUtente(utente: Utente): Promise<Utente>;
}

export type { IUtenteDAO };

