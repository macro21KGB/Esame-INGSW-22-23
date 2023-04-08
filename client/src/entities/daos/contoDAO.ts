import axios from "axios";
import { getTokenDaCookie } from "../../utils/utils";
import { Conto } from "../conto";
import { ElementoConQuantita } from "../menu";
import { API_URL, Result } from "../../utils/constants";

// un conto è finito quando tutte le ordinazione legate
// al conto sono state evase

interface IContoDAO {
    creaConto(conto: Conto): Promise<boolean>;
    getContoByData(data: Date): Promise<Conto>;
    getConti(): Promise<Conto[]>;
    getContiByData(data: Date): Promise<Conto[]>;

    stampaConto(conto: Conto): Promise<boolean>;
}

export class ContoDAO implements IContoDAO {
    async chiudiConto(idConto: number): Promise<boolean> {
        const token = getTokenDaCookie();

        try {
            const result = await axios.put<boolean>(`${API_URL}/conto/${idConto}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            const data: boolean = result.data;

            return data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async aggiornaConto(codiceTavolo: string, elementiConQuantita: ElementoConQuantita[], idRistorante: number): Promise<Result<string>> {
        const token = getTokenDaCookie();

        try {
            const result = await axios.post<Result<string>>(`${API_URL}/ordina/${idRistorante}`, {
                codiceTavolo,
                elementi: elementiConQuantita
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            const data: Result<string> = result.data;
            console.log(data);
            return data;

        } catch (error) {
            console.log(error);
            return {
                success: false,
                data: "Errore durante l'aggiornamento del conto"
            }
        }
    }
    stampaConto(conto: Conto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    creaConto(conto: Conto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getContoByData(data: Date): Promise<Conto> {
        throw new Error("Method not implemented.");
    }
    async getConti(): Promise<Conto[]> {
        const token = getTokenDaCookie();

        try {
            const result = await axios.get<Conto[]>(`${API_URL}/conti`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data: Conto[] = result.data;

            return data;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    getContiByData(data: Date): Promise<Conto[]> {
        throw new Error("Method not implemented.");
    }

}