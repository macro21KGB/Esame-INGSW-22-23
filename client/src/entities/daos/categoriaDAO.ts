import axios from "axios";
import { API_URL, Result } from "../../utils/constants";
import { getTokenDaCookie } from "../../utils/utils";
import { dummyCategoria } from "../dummyObjects";
import { Categoria, Elemento } from "../menu";
import { Ristorante } from "../ristorante";

interface ICategoriaDAO {
	getCategoria(idCategoria: number): Promise<Categoria>;
	getCategorie(idRistorante: number): Promise<Categoria[]>;

	addCategoria(categoria: Categoria): Promise<Categoria>;
	updateCategoria(categoria: Categoria): Promise<Categoria>;
	deleteCategoria(categoria: Categoria): Promise<Categoria>;

	getCategorieRistorante(ristorante: Ristorante): Promise<Categoria[]>;
	getElementiCategoria(categoria: Categoria): Promise<Elemento>;
}

export class CategoriaDAO implements ICategoriaDAO {
	async getCategorie(idRistorante: number): Promise<Categoria[]> {
		const token = getTokenDaCookie();
		const response = await axios.get<string>(`${API_URL}/categorie/${idRistorante}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			}
		})

		const data: Categoria[] = JSON.parse(response.data);
		return data;


	}
	getCategoria(idRistorante: number): Promise<Categoria> {
		return Promise.resolve(new Categoria("categoria1", []));
	}
	addCategoria(categoria: Categoria): Promise<Categoria> {
		throw new Error("Method not implemented.");
	}
	updateCategoria(categoria: Categoria): Promise<Categoria> {
		throw new Error("Method not implemented.");
	}
	deleteCategoria(categoria: Categoria): Promise<Categoria> {
		throw new Error("Method not implemented.");
	}
	getCategorieRistorante(ristorante: Ristorante): Promise<Categoria[]> {
		throw new Error("Method not implemented.");
	}
	getElementiCategoria(categoria: Categoria): Promise<Elemento> {
		throw new Error("Method not implemented.");
	}
}
