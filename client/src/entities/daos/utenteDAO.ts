import { InformazioniUtente } from './../../routes/GestisciUtenza';
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { API_URL, LoginPayload, Result } from "../../utils/constants";
import { getTokenDaCookie, salvaTokenInCookie, verificaEmail } from "../../utils/utils";
import { RUOLI, Utente } from "../utente";



interface IUtenteDAO {
	registraUtente(email: string, password: string): Promise<boolean>;
	accediUtente(email: string, password: string): Promise<Result<LoginPayload>>;

	cambiaPasswordDefault(nuovaPassword: string): Promise<Result<string>>;
	isUtenteUsingDefaultPassword(): Promise<boolean>;

	getUtente(email: string, password: string): Promise<Utente>;
	getUtenti(idRistorante: number): Promise<InformazioniUtente[]>;

	promuoviASupervisore(utente: Utente): Promise<Utente>;

	getUtenteById(id: number): Promise<Utente>;
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
				return false;
			}

			return data.success;
		}
	}

	async accediUtente(email: string, password: string): Promise<Result<LoginPayload>> {
		try {
			if (email == "" || password == "")
				throw new Error("Email o password non validi");

			const result = await axios.post(`${API_URL}/login`, {
				username: email,
				password: password,
			});

			const data: Result<LoginPayload> = result.data;
			return handleSuccessRequest(data);
		} catch (error: any) {
			return handleError(error);
		}
		function handleSuccessRequest(data: Result<LoginPayload>): Result<LoginPayload> {
			if (!data.success) toast.error("Errore sconosciuto");
			console.log(data);
			return {
				data: {
					token: data.data.token,
					ruolo: data.data.ruolo,
					supervisore: data.data.supervisore,
				},
				success: true,
			};
		}

		function handleError(error: AxiosError<any>): Result<LoginPayload> {
			const errorMessage = error.message || "Errore sconosciuto";
			toast.error(errorMessage);
			return {
				data: {
					token: "",
					ruolo: RUOLI.ADMIN,
					supervisore: false,
				},
				success: false,
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

	async getUtenteById(id: number): Promise<Utente> {
		const token = getTokenDaCookie();

		try {
			const response = await axios.get(`${API_URL}/utente/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				}
			});

			const data: Utente = await response.data

			return data;
		} catch (error) {
			throw new Error("Method not implemented.");
		}
	}

	deleteUtente(utente: Utente): Promise<Utente> {
		throw new Error("Method not implemented.");
	}
}

export { UtenteDAO };
export type { IUtenteDAO };
