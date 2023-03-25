import { IUtenteDAO } from '../../client/src/entities/daos/utenteDAO'
import { Utente } from '../../client/src/entities/utente'
class UtenteDAOPostgresDB implements IUtenteDAO {
	getUtenti(): Promise<Utente[]> {
		return Promise.resolve([]);
	}
	async registraUtente(email: string, password: string): Promise<boolean> {
		try {
			

			return handleSuccessRequest(data);

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
