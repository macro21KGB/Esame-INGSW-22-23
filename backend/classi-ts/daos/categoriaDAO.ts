import { Categoria, Elemento } from '../menu';
import { Ristorante } from '../ristorante';

interface ICategoriaDAO {
    getCategoria(id: number): Promise<Categoria>;
    addCategoria(categoria: Categoria): Promise<Categoria>;
    updateCategoria(categoria: Categoria): Promise<Categoria>;
    deleteCategoria(categoria: Categoria): Promise<Categoria>;

    getCategorieRistorante(ristorante: Ristorante): Promise<Categoria[]>;
    getElementiCategoria(categoria: Categoria): Promise<Elemento>;
}


export class CategoriaDAO implements ICategoriaDAO {
    getCategoria(id: number): Promise<Categoria> {
        throw new Error('Method not implemented.');
    }
    addCategoria(categoria: Categoria): Promise<Categoria> {
        throw new Error('Method not implemented.');
    }
    updateCategoria(categoria: Categoria): Promise<Categoria> {
        throw new Error('Method not implemented.');
    }
    deleteCategoria(categoria: Categoria): Promise<Categoria> {
        throw new Error('Method not implemented.');
    }
    getCategorieRistorante(ristorante: Ristorante): Promise<Categoria[]> {
        throw new Error('Method not implemented.');
    }
    getElementiCategoria(categoria: Categoria): Promise<Elemento> {
        throw new Error('Method not implemented.');
    }

}