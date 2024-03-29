import { Allergene } from '../allergene';
import { Elemento, ElementoConQuantita } from "../menu";

interface IElementoDAO {
    getElementi(id_categoria: number): Promise<Elemento[]>;
    getElemento(id: number): Promise<Elemento | null>;

    addElemento(elemento: Elemento, id_categoria: number): Promise<Boolean>;
    updateElemento(id: number, elemento: Elemento): Promise<Boolean>;
    deleteElemento(id: number): Promise<Boolean>;

    // TODO: da aggiornare documentazione
    scambiaOrdineElementi(id1: number, id2: number): Promise<Boolean>;
    getAllergeniElemento(id: number): Promise<Allergene[]>;
}
export type { IElementoDAO };