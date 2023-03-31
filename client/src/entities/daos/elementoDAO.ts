import { Allergene } from './../allergene';
import { Elemento } from "../menu";
import { getTokenDaCookie } from '../../utils/utils';
import { API_URL, Result } from '../../utils/constants';
import axios from 'axios';

interface IElementoDAO {
    getElementi(idCategoria: number): Promise<Elemento[]>;
    getElemento(id: number): Promise<Elemento>;
    addElemento(elemento: Elemento, idCategoria: number): Promise<Result<string>>;
    updateElemento(elemento: Elemento): Promise<Elemento>;
    deleteElemento(idElemento: number): Promise<Result<string>>;

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
    async addElemento(elemento: Elemento, idCategoria: number): Promise<Result<string>> {
        const token = getTokenDaCookie();
        const payload = {
            nome: elemento.nome,
            id_categoria: idCategoria,
            prezzo: elemento.prezzo,
            descrizione: elemento.descrizione,
            allergeni: elemento.allergeni.map(a => a.nome).join(","),
        }

        const response = await axios.post<Result<string>>(`${API_URL}/elemento`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        const data: Result<string> = response.data;
        return data;

    }
    updateElemento(elemento: Elemento): Promise<Elemento> {
        throw new Error('Method not implemented.');
    }
    async deleteElemento(idElemento: number): Promise<Result<string>> {
        const token = getTokenDaCookie();

        const response = await axios.delete<Result<string>>(`${API_URL}/elemento/${idElemento}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        const data: Result<string> = response.data;

        if (!data.success) {
            throw new Error(data.data);
        }

        return data;
    }
    getAllergeniElemento(elemento: Elemento): Promise<Allergene[]> {
        throw new Error('Method not implemented.');
    }

}

export { ElementoDAO };