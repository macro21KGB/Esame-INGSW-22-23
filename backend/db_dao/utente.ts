import { IUtenteDAO } from '../../client/src/entities/daos/utenteDAO'
import { RUOLI, Utente } from '../../client/src/entities/utente'
import {conn} from '../db_connection'

class UtenteDAOPostgresDB implements IUtenteDAO {
    promuoviASupervisore(utente: Utente): Promise<Utente> {
        throw new Error('Method not implemented.');
    }
	getUtenti(): Promise<Utente[]> {
        conn.query('SELECT * FROM public."Utente";', (error : any, results : any) => {
            if (error) {
              console.log(error.stack);
              return [];
              //throw error
            }

            console.log(results.rows);
          })
		return Promise.resolve([]);
	}
	async registraUtente(email: string, password: string): Promise<boolean> {
		try {
			
            let nome="";
            let cognome="";
            let telefono="";
            let ruolo = RUOLI.ADMIN;
			return handleSuccessRequest(new Utente(nome,cognome,telefono,email, ruolo));

		} catch (error: any) {
			return handleError(error);
		}

		function handleError(error: any): boolean {
			const errorMessage = error.response?.data.data || "Errore sconosciuto";
			return false;
		}

		function handleSuccessRequest(data: Utente): boolean {

			return true;
		}
	}

	async accediUtente(email: string, password: string): Promise<Utente | null> {
		throw new Error("Method not implemented.");
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
