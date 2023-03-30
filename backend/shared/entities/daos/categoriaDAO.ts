
import { Categoria, Elemento } from "../menu";
import { Ristorante } from "../ristorante";

interface ICategoriaDAO {
	getElementiCategoria(id_categoria : number): Promise<Elemento[]>;
	getCategoria(idCategoria: number): Promise<Categoria | null>;
	getCategorie(id_ristorante : number): Promise<Categoria[]>;

	addCategoria(categoria: Categoria): Promise<Boolean>;
	updateCategoria(id_categoria : number,nuovo_nome : string): Promise<Boolean>;
	deleteCategoria(id_categoria : number): Promise<Boolean>;
	getElementiCategoria(id_categoria : number): Promise<Elemento[]>;
}
export type { ICategoriaDAO };