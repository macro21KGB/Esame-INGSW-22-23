import { rejects } from 'assert';
import { IUtenteDAO } from '../../client/src/entities/daos/utenteDAO'
import { RUOLI, Ruolo, Utente } from '../../client/src/entities/utente'
import { hashPassword } from '../utils';
import {conn} from '../db_connection'
import { verifyPassword } from '../utils';

class UtenteFactory {
	static getUtente(data : any) : Utente {
		return new Utente(data.nome, data.cognome, data.telefono, data.email, data.ruolo);
	}
}

class UtenteDAOPostgresDB implements IUtenteDAO {
    promuoviASupervisore(utente: Utente): Promise<Utente> {
        throw new Error('Method not implemented.');
    }
	getUtenti(): Promise<Utente[]> {
		return new Promise<Utente[]>(function(resolve, reject) {
			conn.query('SELECT * FROM public."Utente";', (err : any, results : any) => {

				if (err) {
					return reject(err);
				}
				resolve(results.rows.map((data : any) => UtenteFactory.getUtente(data)));
			});
		});
	}
	async registraUtente(email: string, password: string): Promise<boolean> {
		const nome="";
		const cognome="";
		const telefono="";
		const ruolo = RUOLI.ADMIN;
		const data = new Utente(nome,cognome,telefono,email, ruolo);
		const hashedPw = hashPassword(password);
		return new Promise<boolean>(function(resolve, reject) {
			conn.query('INSERT INTO public."Utente" (nome, cognome, telefono, email, password, ruolo) VALUES ($1, $2, $3, $4, $5, $6);',
			 [data.nome, data.cognome, data.telefono, data.email, hashedPw, data.ruolo], (error : any, results : any) => {
				if (error) {
					return reject(error);
				}
				resolve(true);
			});
		});
	}

	async accediUtente(email: string, password: string): Promise<Utente | null> {
		return new Promise<Utente | null>(function(resolve, reject) {
			conn.query('SELECT * FROM public."Utente" WHERE email = $1;', [email], (error : any, results : any) => {
				if (error) {
					return reject(error);
				}
				if (results.rows.length == 0) {
					resolve(null);
				} else {
					if (verifyPassword(password, results.rows[0].password)) {
						resolve(UtenteFactory.getUtente(results.rows[0]));
					}
					else{
						resolve(null);
					}
				}
			});
		});
	}
	getUtente(email: string, password: string): Promise<Utente> {
		throw new Error("Method not implemented.");
	}
	addUtente(utente: Utente): Promise<Utente> {
		throw new Error("Method not implemented.");
	}
	updateUtente(utente: Utente): Promise<Utente> {
		throw new Error("Method not implemented.");
	}
	deleteUtente(utente: Utente): Promise<Utente> {
		throw new Error("Method not implemented.");
	}
}

export { UtenteDAOPostgresDB };
