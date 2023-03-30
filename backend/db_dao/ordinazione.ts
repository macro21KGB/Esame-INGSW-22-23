import { rejects } from 'assert';
import { IOrdinazioneDAO } from '../shared/entities/daos/ordinazioneDAO'
import { Ordinazione } from '../shared/entities/ordinazione'
import {conn} from '../db_connection'
import { IMapper } from './mapper';

//TODO implementare i metodi

class OrdinazioneMapper implements IMapper<Ordinazione>{
    map(data : any) : Ordinazione {
        throw new Error("Method not implemented.");
    }
}

class OrdinazioneDAOPostgresDB implements IOrdinazioneDAO {
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
