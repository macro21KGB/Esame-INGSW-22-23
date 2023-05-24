import { Allergene } from './../allergene';
import { Elemento } from "../menu";
import { getTokenDaCookie } from '../../utils/functions';
import { API_URL, Result } from '../../utils/constants';
import axios, { AxiosError } from 'axios';

interface IElementoDAO {
    getElementi(idCategoria: number): Promise<Elemento[]>;
    getElemento(id: number): Promise<Elemento>;
    addElemento(elemento: Elemento, idCategoria: number): Promise<Result<string>>;
    updateElemento(elemento: Elemento): Promise<Result<string>>;
    deleteElemento(idElemento: number): Promise<Result<string>>;

    scambiaElementi(idElemento1: number, idElemento2: number): Promise<Result<string>>;
    getAllergeniElemento(elemento: Elemento): Promise<Allergene[]>;
}

class ElementoDAO implements IElementoDAO {


    async getElementi(idCategoria: number): Promise<Elemento[]> {
        const token = getTokenDaCookie();
        const response = await axios.get<Elemento[]>(`${API_URL}/elementi/${idCategoria}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data: Elemento[] = response.data;
        return data;
    }


    getElemento(id: number): Promise<Elemento> {
        throw new Error('Method not implemented.');
    }
    async addElemento(elemento: Elemento, idCategoria: number, token?: string): Promise<Result<string>> {
        if (token == undefined) token = getTokenDaCookie();
        const payload = {
            nome: elemento.nome,
            id_categoria: idCategoria,
            prezzo: elemento.prezzo,
            descrizione: elemento.descrizione,
            allergeni: elemento.allergeni.map(a => a.nome).join(","),
        }
        try {
            const response = await axios.post<Result<string>>(`${API_URL}/elemento`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            const data: Result<string> = response.data;
            return data;
        }
        catch (e) {
            return { success: false, data: "Bad request" } as Result<string>;
        }

    }
    async updateElemento(elemento: Elemento): Promise<Result<string>> {
        const token = getTokenDaCookie();

        const payloadToSend = {
            nome: elemento.nome,
            prezzo: elemento.prezzo,
            descrizione: elemento.descrizione,
            allergeni: elemento.allergeni.map(a => a.nome).join(","),
            ingredienti: elemento.ingredienti.join(","),
        }

        try {
            const response = await axios.put<Result<string>>(`${API_URL}/elemento/${elemento.id_elemento}`, payloadToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            const data: Result<string> = response.data;
            return data;
        }
        catch (e) {
            return { success: false, data: "Bad request" } as Result<string>;
        }

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

    async scambiaElementi(idElemento1: number, idElemento2: number, token?: string): Promise<Result<string>> {
        if (token == undefined) token = getTokenDaCookie();
        try {
            const respone = await axios.put<Result<string>>(`${API_URL}/scambia-elementi/${idElemento1}/${idElemento2}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            const data: Result<string> = respone.data;

            return data;
        } catch (error) {
            throw new Error("Errore");
        }
    }

}

export { ElementoDAO };