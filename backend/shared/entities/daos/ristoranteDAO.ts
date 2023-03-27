
import { Ristorante } from '../ristorante';

interface IRistoranteDAO {
    getRistoranti(): Promise<Ristorante[]>;
    getRistorante(id: number): Promise<Ristorante | null>;
    addRistorante(ristorante: Ristorante): Promise<Boolean>;
    updateRistorante(ristorante: Ristorante): Promise<Ristorante>;
    deleteRistorante(id: number): Promise<Ristorante>;
}

export type { IRistoranteDAO };