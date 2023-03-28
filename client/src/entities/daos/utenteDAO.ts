import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { API_URL, Result } from "../../utils/constants";
import { salvaTokenInCookie, verificaEmail } from "../../utils/utils";
import { dummyAdmin } from "../dummyObjects";
import { Ristorante } from "../ristorante";
import { Utente } from "../utente";

type Token = string;
interface IUtenteDAO {
	registraUtente(email: string, password: string): Promise<boolean>;
	accediUtente(email: string, password: string): Promise<Result<string>>;

	getUtente(email: string, password: string): Promise<Utente>;
	getUtenti(): Promise<Utente[]>;

	promuoviASupervisore(utente: Utente): Promise<Utente>;

	addUtente(utente: Utente): Promise<Utente>;
	updateUtente(utente: Utente): Promise<Utente>;
	deleteUtente(utente: Utente): Promise<Utente>;
}

class UtenteDAO implements IUtenteDAO {
	promuoviASupervisore(utente: Utente): Promise<Utente> {
		throw new Error("Method not implemented.");
	}
	getUtenti(): Promise<Utente[]> {
		return Promise.resolve([dummyAdmin]);
	}

	async registraUtente(email: string, password: string): Promise<boolean> {
		try {
			const result = await axios.post(`${API_URL}/register`, {
				username: email,
				password: password,
			});
			const data: Result<string> = result.data;

			return handleSuccessRequest(data);
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
			if (!data.success) toast.error(data.data);

			toast.success("Registrazione effettuata con successo");

			// salva data in un cookie chiamato token con scadenza di 1 ora
			salvaTokenInCookie(data.data, 1);
			return true;
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

export { UtenteDAO };
export type { IUtenteDAO };
