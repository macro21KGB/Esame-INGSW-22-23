

import { Ristorante } from "../ristorante";
import { Utente } from "../utente";

interface IUtenteDAO {
	isPasswordChanged(email: string): Promise<boolean>;
	registraUtente(email: string, password: string): Promise<boolean>;
	accediUtente(email: string, password: string): Promise<Utente | null>;
	
	getUtenteById(id_utente: number): Promise<Utente | null>;
	getUtente(email: string): Promise<Utente | null>;
	getIdUtente(email: string): Promise<number | null>;
	getUtenti(): Promise<Utente[]>;
	getUtentiRistorante(id_ristorante : number): Promise<Utente[]>;
	getRistoranti(email: string) : Promise<Ristorante[]>;
	getRistorante(email:string) : Promise<Ristorante>;

	promuoviASupervisore(utente: Utente): Promise<Utente>;
	getAdmin(email: string): Promise<Utente | null>;
	addUtenteImpiegato(utente: Utente, id_ristorante_impiegato:number): Promise<Boolean>;
	updateUtente(new_utente: Utente, email:string, supervisore : boolean): Promise<Boolean>;
	updatePassword(email: string, plain_password: string): Promise<Boolean>;
	deleteUtente(email: string): Promise<Boolean>;
	registraUtenza(utente : Utente, plain_password : string, id_ristorante: number) : Promise<Boolean>;
}

export type { IUtenteDAO };

