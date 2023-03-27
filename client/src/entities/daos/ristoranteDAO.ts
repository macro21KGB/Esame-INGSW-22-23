import { dummyResturant } from '../dummyObjects';
import { Ristorante } from './../ristorante';

interface IRistoranteDAO {
    getRistoranti(): Promise<Ristorante[]>;
    getRistorante(id: number): Promise<Ristorante | null>;
    addRistorante(ristorante: Ristorante): Promise<Boolean>;
    updateRistorante(ristorante: Ristorante): Promise<Ristorante>;
    deleteRistorante(id: number): Promise<Ristorante>;
}


// TODO da implementare
class RistoranteDAO implements IRistoranteDAO {
    getRistoranti(): Promise<Ristorante[]> {
        return Promise.resolve([dummyResturant]);
    }
    getRistorante(id: number): Promise<Ristorante | null> {
        return Promise.resolve(dummyResturant);
    }
    addRistorante(ristorante: Ristorante): Promise<Boolean> {
        return Promise.resolve(true);
    }
    updateRistorante(ristorante: Ristorante): Promise<Ristorante> {
        return Promise.resolve(dummyResturant);
    }
    deleteRistorante(id: number): Promise<Ristorante> {
        //TODO  
        return Promise.resolve(dummyResturant);
    }
}

export { RistoranteDAO }; export type { IRistoranteDAO };