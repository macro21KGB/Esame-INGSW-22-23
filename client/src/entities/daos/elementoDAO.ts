import { Allergene } from './../allergene';
import { Elemento } from "../menu";

interface IElementoDAO {
    getElemento(id: number): Promise<Elemento>;
    addElemento(elemento: Elemento): Promise<Elemento>;
    updateElemento(elemento: Elemento): Promise<Elemento>;
    deleteElemento(elemento: Elemento): Promise<Elemento>;

    getAllergeniElemento(elemento: Elemento): Promise<Allergene[]>;
}

class ElementoDAO implements IElementoDAO {
    getElemento(id: number): Promise<Elemento> {
        throw new Error('Method not implemented.');
    }
    addElemento(elemento: Elemento): Promise<Elemento> {
        throw new Error('Method not implemented.');
    }
    updateElemento(elemento: Elemento): Promise<Elemento> {
        throw new Error('Method not implemented.');
    }
    deleteElemento(elemento: Elemento): Promise<Elemento> {
        throw new Error('Method not implemented.');
    }
    getAllergeniElemento(elemento: Elemento): Promise<Allergene[]> {
        throw new Error('Method not implemented.');
    }

}

export { ElementoDAO };