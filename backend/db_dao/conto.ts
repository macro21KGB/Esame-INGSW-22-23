import { rejects } from 'assert';
import { IContoDAO } from '../shared/entities/daos/contoDAO'
import { Conto } from '../shared/entities/conto'
import {conn} from '../db_connection'
import { IMapper } from './mapper';

//TODO implementare i metodi

class ContoMapper implements IMapper<Conto>{
    map(data : any) : Conto {
        throw new Error("Method not implemented.");
    }
}

class ContoDAOPostgresDB implements IContoDAO {
    creaConto(conto: Conto): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getContoByData(data: Date): Promise<Conto> {
        throw new Error('Method not implemented.');
    }
    getConti(): Promise<Conto[]> {
        throw new Error('Method not implemented.');
    }
    getContiByData(data: Date): Promise<Conto[]> {
        throw new Error('Method not implemented.');
    }
    stampaConto(conto: Conto): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}