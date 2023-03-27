import { Allergene } from '../allergene';
import { Elemento } from "../menu";

interface IElementoDAO {
    getElemento(id: number): Promise<Elemento>;
    addElemento(elemento: Elemento): Promise<Elemento>;
    updateElemento(elemento: Elemento): Promise<Elemento>;
    deleteElemento(elemento: Elemento): Promise<Elemento>;

    getAllergeniElemento(elemento: Elemento): Promise<Allergene[]>;
}
export type { IElementoDAO };