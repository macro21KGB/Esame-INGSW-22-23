import axios, { AxiosError } from 'axios';
import { getTokenDaCookie } from '../../utils/utils';
import { Ordinazione } from './../ordinazione';
import { API_URL, OrdinazioneConCodice, Result } from '../../utils/constants';

interface IOrdinazioneDAO {
    getOrdinazioni(): Promise<Ordinazione[]>;
    getOrdinazioniNonEvase(): Promise<Result<OrdinazioneConCodice[]>>
    getOrdinazioneConCodiceTavolo(codice_tavolo: number): Promise<Ordinazione[]>;
    getOrdinazione(id: number): Promise<Ordinazione>;

    evadiOrdinazione(id: number): Promise<boolean>;

    addOrdinazione(ordinazione: Ordinazione): Promise<Ordinazione>;
    updateOrdinazione(ordinazione: Ordinazione): Promise<Ordinazione>;
    deleteOrdinazione(id: number): Promise<Ordinazione>;

}


class OrdinazioneDAO implements IOrdinazioneDAO {
    getOrdinazioni(): Promise<Ordinazione[]> {
        throw new Error('Method not implemented.');
    }
    async getOrdinazioniNonEvase(): Promise<Result<OrdinazioneConCodice[]>> {
        const token = getTokenDaCookie();

        try {
            const result = await axios.get<Result<OrdinazioneConCodice[]>>(`${API_URL}/ordinazioni/${false}`, {
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
    getOrdinazione(id: number): Promise<Ordinazione> {
        throw new Error('Method not implemented.');
    }
    evadiOrdinazione(id: number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    addOrdinazione(ordinazione: Ordinazione): Promise<Ordinazione> {
        throw new Error('Method not implemented.');
    }
    updateOrdinazione(ordinazione: Ordinazione): Promise<Ordinazione> {
        throw new Error('Method not implemented.');
    }
    deleteOrdinazione(id: number): Promise<Ordinazione> {
        throw new Error('Method not implemented.');
    }

}

export { OrdinazioneDAO };