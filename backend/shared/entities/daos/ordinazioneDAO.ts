import { Ordinazione } from '../ordinazione';

interface IOrdinazioneDAO {
    getOrdinazioni(): Promise<Ordinazione[]>;
    getOrdinazioniNonEvase(): Promise<Ordinazione[]>;
    getOrdinazioneConCodiceTavolo(codice_tavolo: number): Promise<Ordinazione[]>;
    getOrdinazione(id: number): Promise<Ordinazione>;

    evadiOrdinazione(id: number): Promise<boolean>;
    
    addOrdinazione(ordinazione: Ordinazione): Promise<Ordinazione>;
    updateOrdinazione(ordinazione: Ordinazione): Promise<Ordinazione>;
    deleteOrdinazione(id: number): Promise<Ordinazione>;

}
export type { IOrdinazioneDAO };