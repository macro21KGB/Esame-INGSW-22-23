import { InformazioniUtente } from './../../routes/GestisciUtenza';
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, Result } from "../../utils/constants";
import { getTokenDaCookie, salvaTokenInCookie, verificaEmail } from "../../utils/utils";
import { Utente } from "../utente";

type Token = string;
interface IUtenteDAO {
	registraUtente(email: string, password: string): Promise<boolean>;
	accediUtente(email: string, password: string): Promise<Result<string>>;

	getUtente(email: string, password: string): Promise<Utente>;
	getUtenti(idRistorante: number): Promise<Utente[]>;

	promuoviASupervisore(utente: Utente): Promise<Utente>;

	addUtente(InformazioniUtente: InformazioniUtente, idRistorante: number): Promise<Result<string>>;
	updateUtente(utente: Utente): Promise<Utente>;
	deleteUtente(utente: Utente): Promise<Utente>;
}

class UtenteDAO implements IUtenteDAO {
	promuoviASupervisore(utente: Utente): Promise<Utente> {
		throw new Error("Method not implemented.");
	}
	async getUtenti(idRistorante: number): Promise<Utente[]> {
		const token = getTokenDaCookie();
		try {
			const response = await axios.get(`${API_URL}/utenti/${idRistorante}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			const data: Utente[] = await response.data
			return data;
		}
		catch (error) {
			toast.error("Non è stato possibile recuperare gli utenti");
			return Promise.resolve([]);
		}
	}

	async registraUtente(email: string, password: string): Promise<boolean> {
		try {

			if (email == "" || password == "")
				return false

			const result = await axios.post<Result<string>>(`${API_URL}/register`, {
				username: email,
				password: password,
			});
			const data: Result<string> = result.data;
			if (data.success) {
				return handleSuccessRequest(data);

			}

			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			return handleError(error);
		}

		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		function handleError(error: any): boolean {

			toast.error("Non è stato possibile registrare l'utente");
			return false;
		}

		function handleSuccessRequest(data: Result<string>): boolean {
			if (!data.success) {
				toast.error("Non è stato possibile registrare l'utente");
				return false;
			}

			toast.success("Registrazione effettuata con successo");
			// salva data in un cookie chiamato token con scadenza di 1 ora

			return data.success;
		}
	}

	async accediUtente(email: string, password: string): Promise<Result<string>> {
		try {
			const result = await axios.post(`${API_URL}/login`, {
				username: email,
				password: password,
			});

			const data: Result<string> = result.data;
			console.log(data);
			return handleSuccessRequest(data);
		} catch (error) {
			return handleError(error);
		}

		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		function handleError(error: any): Result<string> {
			const errorMessage = error.response?.data.data || "Errore sconosciuto";
			toast.error(errorMessage);
			return {
				data: errorMessage,
				success: false,
			};
		}

		// quando l'utente si è loggato con successo, salva il token in un cookie
		// e ritorna il token stesso
		function handleSuccessRequest(data: Result<string>): Result<string> {
			if (!data.success) toast.error(data.data);

			// salva data in un cookie chiamato token con scadenza di 1 ora
			salvaTokenInCookie(data.data, 1);
			return {
				data: data.data,
				success: true,
			};
		}
	}
	getUtente(email: string, password: string): Promise<Utente> {
		throw new Error("Method not implemented.");
	}
	async addUtente(informazioniUtente: InformazioniUtente, idRistorante: number): Promise<Result<string>> {
		try {
			const token = getTokenDaCookie();
			const response = await axios.post(`${API_URL}/utenza`, informazioniUtente, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				}
			});
			const data: Result<string> = await response.data

			if (data.success) {
				return data;
			} else {
				throw new Error("Non è stato possibile aggiungere l'utente");
			}
		}
		catch (error) {
			return Promise.resolve({
				success: false,
				data: error.data
			} as Result<string>);
		}
	}
	updateUtente(utente: Utente): Promise<Utente> {
		throw new Error("Method not implemented.");
	}
	deleteUtente(utente: Utente): Promise<Utente> {
		throw new Error("Method not implemented.");
	}
}

export { UtenteDAO };
export type { IUtenteDAO };
