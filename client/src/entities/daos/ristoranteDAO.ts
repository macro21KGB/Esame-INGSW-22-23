import { toast } from "react-toastify";
import axios from "axios";
import { getTokenDaCookie } from "../../utils/utils";
import { API_URL, Result } from "../../utils/constants";
import { dummyResturant } from "../dummyObjects";
import { Ristorante } from "./../ristorante";

interface IRistoranteDAO {
	getRistoranti(): Promise<Ristorante[]>;
	getRistorante(id: number): Promise<Ristorante | null>;
	addRistorante(ristorante: Ristorante): Promise<Result<string>>;
	updateRistorante(ristorante: Ristorante): Promise<Ristorante>;
	deleteRistorante(id: number): Promise<Ristorante>;
}

// TODO da implementare
class RistoranteDAO implements IRistoranteDAO {
	async getRistoranti(): Promise<Ristorante[]> {
		try {
			const token = getTokenDaCookie();
			const response = await axios.get<string>(`${API_URL}/resturants`, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			return JSON.parse(response.data);
		} catch (error) {
			toast.error("Errore nel recupero dei ristoranti");
		}
	}

	async getRistorante(id: number): Promise<Ristorante | null> {
		try {
			const token = getTokenDaCookie();
			const response = await axios.get<string>(`${API_URL}/resturant/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			return JSON.parse(response.data);
		} catch (error) {
			toast.error("Errore nel recupero del ristorante");
		}
	}
	async addRistorante(ristorante: Ristorante): Promise<Result<string>> {
		try {
			const token = getTokenDaCookie();
			const dataToSend = {
				nome: ristorante.nome,
				indirizzo: ristorante.indirizzo,
				telefono: ristorante.telefono,
				sitoWeb: ristorante.sitoWeb,
			}
			const response = await axios.post<Result<string>>(`${API_URL}/resturant`, dataToSend, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			console.log(response.data);

			if (response.status === 200) {
				return response.data;
			}
			
			return {
				success: false,
				data: "Errore nell'aggiunta del ristorante",
			};
 
		} catch (error) {
			toast.error("Errore nell'aggiunta del ristorante");
		}
	}
	
	updateRistorante(ristorante: Ristorante): Promise<Ristorante> {
		return Promise.resolve(dummyResturant);
	}
	deleteRistorante(id: number): Promise<Ristorante> {
		//TODO
		return Promise.resolve(dummyResturant);
	}
}

export { RistoranteDAO };
export type { IRistoranteDAO };
