import { Allergene } from './../allergene';
import { Elemento } from "../menu";
import { getTokenDaCookie } from '../../utils/utils';
import { API_URL } from '../../utils/constants';
import axios from 'axios';

interface IElementoDAO {
    getElementi(idCategoria: number): Promise<Elemento[]>;
    getElemento(id: number): Promise<Elemento>;
    addElemento(elemento: Elemento): Promise<Elemento>;
    updateElemento(elemento: Elemento): Promise<Elemento>;
    deleteElemento(elemento: Elemento): Promise<Elemento>;

    getAllergeniElemento(elemento: Elemento): Promise<Allergene[]>;
}

class ElementoDAO implements IElementoDAO {
    async getElementi(idCategoria: number): Promise<Elemento[]> {
        const token = getTokenDaCookie();
        const response = await axios.get<string>(`${API_URL}/elementi/${idCategoria}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const data: Elemento[] = JSON.parse(response.data) || [];
        return data;

    }


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