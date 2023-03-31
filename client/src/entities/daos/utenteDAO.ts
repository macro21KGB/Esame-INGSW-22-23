import { InformazioniUtente } from './../../routes/GestisciUtenza';
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { API_URL, Result } from "../../utils/constants";
import { getTokenDaCookie, salvaTokenInCookie, verificaEmail } from "../../utils/utils";
import { Utente } from "../utente";

type Token = string;
interface IUtenteDAO {
	registraUtente(email: string, password: string): Promise<boolean>;
	accediUtente(email: string, password: string): Promise<Result<string>>;

	cambiaPasswordDefault(nuovaPassword: string): Promise<Result<string>>;
	isUtenteUsingDefaultPassword(): Promise<boolean>;

	getUtente(email: string, password: string): Promise<Utente>;
	getUtenti(idRistorante: number): Promise<InformazioniUtente[]>;

	promuoviASupervisore(utente: Utente): Promise<Utente>;

	addUtente(InformazioniUtente: InformazioniUtente, idRistorante: number): Promise<Result<string>>;
	updateUtente(utente: InformazioniUtente): Promise<Result<string>>;
	deleteUtente(utente: Utente): Promise<Utente>;
}

class UtenteDAO implements IUtenteDAO {
	async cambiaPasswordDefault(nuovaPassword: string): Promise<Result<string>> {
		const token = getTokenDaCookie();

		const response = await axios.post<Result<string>>(`${API_URL}/pw-change`, {
			password: nuovaPassword,
		}, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			}
		});

		if (response.data.success)
			return response.data;

		throw new Error(response.data.data);
	}

	async isUtenteUsingDefaultPassword(): Promise<boolean> {
		const token = getTokenDaCookie();

		const response = await axios.get<string>(`${API_URL}/pw-changed`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});

		const data: string = response.data;
		return !!data;
	}

	promuoviASupervisore(utente: Utente): Promise<Utente> {
		throw new Error("Method not implemented.");
	}

	async getUtenti(idRistorante: number): Promise<InformazioniUtente[]> {
		const token = getTokenDaCookie();
		try {
			const response = await axios.get(`${API_URL}/utenti/${idRistorante}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data: InformazioniUtente[] = await JSON.parse(response.data);
			return data;
		}
		catch (error) {
			toast.error("Non è stato possibile recuperare gli utenti");
			return [];
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
			return handleError(data);
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
			if (email == "" || password == "")
				throw new Error("Email o password non validi");

			const result = await axios.post(`${API_URL}/login`, {
				username: email,
				password: password,
			});

			const data: Result<string> = result.data;
			return handleSuccessRequest(data);
		} catch (error: any) {
			return handleError(error);
		}

		function handleError(error: AxiosError<any>): Result<string> {
			const errorMessage = error.message || "Errore sconosciuto";
			toast.error(errorMessage);
			return {
				data: errorMessage,
				success: false,
			};
		}

		function handleSuccessRequest(data: Result<string>): Result<string> {
			if (!data.success) toast.error(data.data);

			// salva data in un cookie chiamato token con scadenza di 1 ora

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
		const token = getTokenDaCookie();

		const payloadToSend = {
			nome: informazioniUtente.nome,
			cognome: informazioniUtente.cognome,
			email: informazioniUtente.email,
			password: informazioniUtente.password,
			ruolo: informazioniUtente.ruolo,
			telefono: informazioniUtente.telefono,
			supervisore: informazioniUtente.supervisore + "",
		}

		const response = await axios.post(`${API_URL}/utenza/${idRistorante}`, payloadToSend, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			}
		});

		const data: Result<string> = await response.data

		if (data.success) {
			return data;
		} else {
			return {
				data: "Errore sconosciuto",
				success: false
			};
		}

	}
	async updateUtente(utente: InformazioniUtente): Promise<Result<string>> {
		const token = getTokenDaCookie();
		try {

			const payloadToSend = {
				nome: utente.nome,
				cognome: utente.cognome,
				telefono: utente.telefono,
				supervisore: utente.supervisore + "",
			}

			const response = await axios.put(`${API_URL}/utente/${utente.email}`, payloadToSend, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				}
			});

			const data: Result<string> = await response.data
			if (data.success)
				return data;

			return {
				data: "Errore nella modifica dell'utente",
				success: false
			};
		} catch (error) {
			return {
				data: "Errore nella modifica dell'utente",
				success: false
			};
		}

	}

	deleteUtente(utente: Utente): Promise<Utente> {
		throw new Error("Method not implemented.");
	}
}

export { UtenteDAO };
export type { IUtenteDAO };
