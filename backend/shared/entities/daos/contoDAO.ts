import { Conto } from "../conto";

// un conto è finito quando tutte le ordinazione legate
// al conto sono state evase

interface IContoDAO {
    creaConto(conto: Conto): Promise<boolean>;
    getContoByData(data: Date): Promise<Conto>;
    getConti(): Promise<Conto[]>;
    getContiByData(data: Date): Promise<Conto[]>;
  
    stampaConto(conto: Conto): Promise<boolean>;
}
export type { IContoDAO };