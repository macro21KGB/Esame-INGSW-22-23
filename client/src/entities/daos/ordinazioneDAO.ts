import axios from 'axios';
import { convertFullDateStringToDateString, convertToDateString, createArrayOfDates, getTokenDaCookie } from '../../utils/utils';
import { Ordinazione } from './../ordinazione';
import { API_URL, DateString, OrdinazioneConCodice, Result } from '../../utils/constants';

interface IOrdinazioneDAO {
    getOrdinazioni(evase: boolean): Promise<Result<Ordinazione[]>>;
    getOrdinazioneConCodiceTavolo(codice_tavolo: number): Promise<Ordinazione[]>;
    getOrdinazione(id: number): Promise<Ordinazione>;
    evadiOrdinazione(ordinazione: Ordinazione): Promise<boolean>;
    getOrdinazioniEvasiPerUtente(selectedUserEmail: string, from: Date, to: Date): Promise<{ giorno: DateString, numero_ordinazioni: number }[]>;

    addOrdinazione(ordinazione: Ordinazione): Promise<Ordinazione>;
    updateOrdinazione(ordinazione: Ordinazione): Promise<Ordinazione>;
    deleteOrdinazione(id: number): Promise<boolean>;

}


class OrdinazioneDAO implements IOrdinazioneDAO {
    async getOrdinazioni(evase: boolean): Promise<Result<Ordinazione[]>> {
        const token = getTokenDaCookie();

        try {
            const result = await axios.get<Result<OrdinazioneConCodice[]>>(`${API_URL}/ordinazioni/${evase}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            const ordinazioni = result.data;

            return ordinazioni;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    getOrdinazioneConCodiceTavolo(codice_tavolo: number): Promise<Ordinazione[]> {
        throw new Error('Method not implemented.');
    }
    async getOrdinazioniEvasiPerUtente(selectedUserEmail: string, from: Date, to: Date): Promise<{ giorno: DateString, numero_ordinazioni: number }[]> {
        const token = getTokenDaCookie();

        if (to === null)
            to = new Date();

        try {
            const payloadToSend = {
                emailUtente: selectedUserEmail,
                dataInizio: convertToDateString(from),
                dataFine: convertToDateString(to)
            }

            const result = await axios.post<{ giorno: DateString, numero_ordinazioni: number }[]>(`${API_URL}/ordinazioni/evase/`, payloadToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const data = result.data;

            return data.map((item => {
                return {
                    giorno: convertFullDateStringToDateString(item.giorno),
                    numero_ordinazioni: +item.numero_ordinazioni
                }
            }));
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }

    getOrdinazione(id: number): Promise<Ordinazione> {
        throw new Error('Method not implemented.');
    }
    async evadiOrdinazione(ordinazione: Ordinazione): Promise<boolean> {
        const token = getTokenDaCookie();

        try {
            const response = axios.put<Result<string>>(`${API_URL}/ordinazione/${ordinazione.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return (await response).data.success;

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    addOrdinazione(ordinazione: Ordinazione): Promise<Ordinazione> {
        throw new Error('Method not implemented.');
    }
    updateOrdinazione(ordinazione: Ordinazione): Promise<Ordinazione> {
        throw new Error('Method not implemented.');
    }
    async deleteOrdinazione(id: number): Promise<boolean> {
        const token = getTokenDaCookie();

        try {
            const result = await axios.delete<boolean>(`${API_URL}/ordinazione/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return result.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

}

export { OrdinazioneDAO };