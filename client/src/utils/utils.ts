import axios from "axios";
import { toast } from "react-toastify";
import { Result, RUOLI } from "./constants";


export function verificaNumeroTelefono(numeroTelefono: string) {
	return numeroTelefono.match(/^[0-9]{10}$/) !== null;
}

export function stringToRuolo(ruoloString: string) {
	switch (ruoloString) {
		case RUOLI.ADMIN:
			return RUOLI.ADMIN;
		case RUOLI.MANAGER:
			return RUOLI.MANAGER;
		case RUOLI.ADDETTO_ALLA_CUCINA:
			return RUOLI.ADDETTO_ALLA_CUCINA;
		case RUOLI.CAMERIERE:
			return RUOLI.CAMERIERE;
		default:
			return RUOLI.NESSUNO;
	}
}

export const mandaRichiestaEVisualizzaToast = async (url: string, method: string, body?: any) => {
	try {
		const result = await axios.post(url, {
			username: body.email,
			password: body.password,
		});

		if (result.status !== 200) {
			toast.error("Errore durante il login");
			return;
		}

		const data: Result = result.data;

		if (data.success) {
			toast.success("Login effettuato con successo");

			// salva data in un cookie chiamato token con scadenza di 1 ora
			document.cookie = `token=${data.data}; max-age=3600`;
		} else {
			toast.error("Login fallito: Credenziali errate");
		}
	} catch (error) {
		toast.error("Errore durante il login");
	}
}