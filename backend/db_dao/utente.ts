import { rejects } from 'assert';
import { IUtenteDAO } from '../shared/entities/daos/utenteDAO'
import { RUOLI, Ruolo, Utente,UtenteFactory} from '../shared/entities/utente'
import { hashPassword } from '../utils';
import {conn} from '../db_connection'
import { verifyPassword } from '../utils';
import { IMapper } from './mapper';
import { Ristorante } from '@shared/entities/ristorante';
import { RistoranteMapper } from './ristorante';
class UtenteMapper implements IMapper<Utente> {
	map(data : any) : Utente {
		return UtenteFactory.creaUtente(data.nome, data.cognome, data.telefono, data.email, data.ruolo,data.supervisore);
	}
}

class UtenteDAOPostgresDB implements IUtenteDAO {
	getUtentiRistorante(id_ristorante : number): Promise<Utente[]>{
		return new Promise((resolve, reject) => {
			conn.query('SELECT * FROM "Utente" natural join "UtenteRistorante" WHERE id_ristorante = $1;', [id_ristorante], (err : any, results : any) => {
				if (err) {
					return reject(err);
				}
				resolve(results.rows.map((data : any) => new UtenteMapper().map(data)));
			});
		});
	}
	registraUtenza(utente: Utente, plain_password : string): Promise<Boolean> {
		return new Promise((resolve, reject) => {
			if( utente.ruolo == RUOLI.ADMIN) {
				return resolve(false);
			}
			conn.query('INSERT INTO public."Utente" (nome, cognome, email, password, telefono, ruolo) VALUES ($1, $2, $3, $4, $5, $6);', [utente.nome, utente.cognome, utente.email, hashPassword(plain_password), utente.telefono, utente.ruolo], (err : any, results : any) => {
				if (err) {
					return reject(err);
				}
				resolve(true);
			});
		});
	}
	isPasswordChanged(email: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			conn.query('SELECT pw_changed FROM public."Utente" WHERE email = $1;', [email], (err : any, results : any) => {
				if (err) {
					return reject(err);
				}
				resolve(results.rows[0].pw_changed);
			});
		});
	}
	updatePassword(email: string, plain_password: string): Promise<Boolean> {
		return new Promise((resolve, reject) => {
			conn.query('UPDATE public."Utente" SET password = $1, pw_changed = true WHERE email = $2;', [hashPassword(plain_password), email], (err : any, results : any) => {
				if (err) {
					return reject(err);
				}
				resolve(true);
			});
		});
	}
	getAdmin(email: string): Promise<Utente | null> {
		// utilizza la tabella utente ristorante per trovare l'email dell' admin con lo stesso id ristorante
		return new Promise((resolve, reject) => {
			conn.query(`
				SELECT * FROM (SELECT c.id_ristorante,email as impiegato_email, "UtenteRistorante".id_utente as admin_id FROM(
				SELECT * FROM (
				SELECT "Utente".id_utente as id_utente, "Utente".email as email,
				"Utente".ruolo as ruolo, "UtenteRistorante".id_ristorante as id_ristorante
				FROM ("Utente" natural join "UtenteRistorante")
				) as t where t.email = $1
				)as c inner join "UtenteRistorante" on c.id_ristorante="UtenteRistorante".id_ristorante
				where is_admin = true )as d inner join "Utente" on admin_id = id_utente;`,[email], (err : any, results : any) => {
				if (err) {
					return reject(err);
				}
				if (results.rows.length === 0) {
					return resolve(null);
				}
				resolve(this.utenteMapper.map(results.rows[0]));
			});
		})
		
	}

	getUtente(email: string): Promise<Utente | null> {
		return new Promise((resolve, reject) => {
			conn.query('SELECT * FROM public."Utente" WHERE email = $1;', [email], (err : any, results : any) => {
				if (err) {
					return reject(err);
				}
				if (results.rows.length === 0) {
					return resolve(null);
				}
				resolve(this.utenteMapper.map(results.rows[0]));
			});
		});
	}
	utenteMapper : UtenteMapper = new UtenteMapper();
	ristoranteMapper : RistoranteMapper = new RistoranteMapper();
	getRistoranti(email: string): Promise<Ristorante[]> {
		return new Promise((resolve, reject) => {
			conn.query(`
			SELECT * FROM (
			SELECT "Utente".id_utente as id_utente, "Utente".email as email,
			"Utente".password as pw,"Utente".ruolo as ruolo, "UtenteRistorante".id_ristorante as id_ristorante
			FROM ("Utente" natural join "UtenteRistorante")
			) as t natural join "Ristorante" where email = $1;
			`,[email], (err : any, results : any) => {

				if (err) {
					return reject(err);
				}
				resolve(results.rows.map((data : any) => this.ristoranteMapper.map(data)));
			});
		});
	}
	
    promuoviASupervisore(utente: Utente): Promise<Utente> {
        throw new Error('Method not implemented.');
    }
	getUtenti(): Promise<Utente[]> {
		return new Promise((resolve, reject) => {
			conn.query('SELECT * FROM public."Utente";', (err : any, results : any) => {

				if (err) {
					return reject(err);
				}
				resolve(results.rows.map((data : any) => this.utenteMapper.map(data)));
			});
		});
	}
	async registraUtente(email: string, password: string): Promise<boolean> {
		const nome="";
		const cognome="";
		const telefono="";
		const ruolo = RUOLI.ADMIN;
		const data = UtenteFactory.creaUtente(nome, cognome, telefono, email, ruolo);
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
		return new Promise((resolve, reject) =>{
			conn.query('SELECT * FROM public."Utente" WHERE email = $1;', [email], (error : any, results : any) => {
				if (error) {
					return reject(error);
				}
				if (results.rows.length == 0) {
					resolve(null);
				} else {
					if (verifyPassword(password, results.rows[0].password)) {
						resolve(this.utenteMapper.map(results.rows[0]));
					}
					else{
						resolve(null);
					}
				}
			});
		});
	}
	getIdUtente(email: string): Promise<number | null> {
		return new Promise((resolve, reject) =>{
			conn.query('SELECT * FROM public."Utente" WHERE email = $1;', [email], (error : any, results : any) => {
				if (error) {
					return reject(error);
				}
				if (results.rows.length == 0) {
					resolve(null);
				} else {
					resolve(results.rows[0].id_utente);
				}
			});
		});
	}
	addUtenteImpiegato(utente: Utente,id_ristorante_impiegato:number): Promise<Boolean> {
		throw new Error("Method not implemented.");
	}
	updateUtente(new_utente: Utente, email:string): Promise<Boolean> {
		return new Promise((resolve, reject) => {
			conn.query('UPDATE public."Utente" SET nome = $1, cognome = $2, telefono = $3, email = $4 WHERE email = $5;',
			 [new_utente.nome, new_utente.cognome, new_utente.telefono, new_utente.email, email], (error : any, results : any) => {
				if (error) {
					return reject(false);
				}
				resolve(true);
			});
		});
	}
	deleteUtente(email: string): Promise<Boolean> {
		// cancella a cascata
		return new Promise((resolve, reject) => {
			conn.query('DELETE FROM public."UtenteRistorante" WHERE id_utente = (SELECT id_utente FROM public."Utente" WHERE email = $1);', [email], (error : any, results : any) => {
				if (error) {
					return reject(false);
				}
				conn.query('DELETE FROM public."Utente" WHERE email = $1;', [email], (error : any, results : any) => {
					if (error) {
						return reject(false);
					}
					resolve(true);
				});
			});
		}
		);
	}
}

export { UtenteDAOPostgresDB };
