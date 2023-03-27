
import { Categoria, Elemento } from "../menu";
import { Ristorante } from "../ristorante";

interface ICategoriaDAO {
	getCategoria(idCategoria: number): Promise<Categoria>;
	getCategorie(): Promise<Categoria[]>;

	addCategoria(categoria: Categoria): Promise<Categoria>;
	updateCategoria(categoria: Categoria): Promise<Categoria>;
	deleteCategoria(categoria: Categoria): Promise<Categoria>;

	getCategorieRistorante(ristorante: Ristorante): Promise<Categoria[]>;
	getElementiCategoria(categoria: Categoria): Promise<Elemento>;
}
export type { ICategoriaDAO };