import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { API_URL, Result } from "../../utils/constants";
import { salvaTokenInCookie, verificaEmail } from "../../utils/utils";
import { Utente } from "../utente";

interface IUtenteDAO {
	registraUtente(email: string, password: string): Promise<boolean>;
	accediUtente(email: string, password: string): Promise<Utente | null>;

	getUtente(email: string, password: string): Promise<Utente>;
	getUtenti(): Promise<Utente[]>;

	addUtente(utente: Utente): Promise<Utente>;
	updateUtente(utente: Utente): Promise<Utente>;
	deleteUtente(utente: Utente): Promise<Utente>;
}

class UtenteDAO implements IUtenteDAO {
	getUtenti(): Promise<Utente[]> {
		return Promise.resolve([]);
	}
	async registraUtente(email: string, password: string): Promise<boolean> {
		try {
			const result = await axios.post(`${API_URL}/register`, {
				username: email,
				password: password,
			});

			const data: Result = result.data;

			return handleSuccessRequest(data);
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			return handleError(error);
		}

		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		function handleError(error: any): boolean {
			const errorMessage = error.response?.data.data || "Errore sconosciuto";
			toast.error(errorMessage);
			return false;
		}

		function handleSuccessRequest(data: Result): boolean {
			if (!data.success) toast.error(data.data);

			toast.success("Login effettuato con successo");

			// salva data in un cookie chiamato token con scadenza di 1 ora
			salvaTokenInCookie(data.data, 1);
			return true;
		}
	}

	async accediUtente(email: string, password: string): Promise<Utente | null> {
		try {
			const result = await axios.post(`${API_URL}/login`, {
				username: email,
				password: password,
			});

			const data: Result = result.data;

			return handleSuccessRequest(data);
		} catch (error) {
			return handleError(error);
		}

		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		function handleError(error: any): Utente | null {
			const errorMessage = error.response?.data.data || "Errore sconosciuto";
			toast.error(errorMessage);
			return null;
		}

		function handleSuccessRequest(data: Result): Utente | null {
			if (!data.success) toast.error(data.data);

			toast.success("Login effettuato con successo");

			// salva data in un cookie chiamato token con scadenza di 1 ora
			salvaTokenInCookie(data.data, 1);
			return Utente.fromJson(data.data);
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
