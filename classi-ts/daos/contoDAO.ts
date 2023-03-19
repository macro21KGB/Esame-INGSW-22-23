import { Conto } from "../conto";

// un conto è finito quando tutte le ordinazione legate
// al conto sono state evase

interface IContoDAO {
    creaConto(conto: Conto): Promise<boolean>;
    getContoByData(data: Date): Promise<Conto>;
    getConti(): Promise<Conto[]>;
    getContiByData(data: Date): Promise<Conto[]>;
  
}

export class ContoDAO implements IContoDAO {
    creaConto(conto: Conto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getContoByData(data: Date): Promise<Conto> {
        throw new Error("Method not implemented.");
    }
    getConti(): Promise<Conto[]> {
        throw new Error("Method not implemented.");
    }
    getContiByData(data: Date): Promise<Conto[]> {
        throw new Error("Method not implemented.");
    }

}