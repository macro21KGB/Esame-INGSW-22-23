import { Ordinazione } from './../ordinazione';

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

class OrdinazioneDAO implements IOrdinazioneDAO {
    getOrdinazioni(): Promise<Ordinazione[]> {
        throw new Error('Method not implemented.');
    }
    getOrdinazioniNonEvase(): Promise<Ordinazione[]> {
        throw new Error('Method not implemented.');
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