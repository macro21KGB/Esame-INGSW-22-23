import { rejects } from 'assert';
import { IContoDAO } from '../shared/entities/daos/contoDAO'
import { Conto } from '../shared/entities/conto'
import { conn } from '../db_connection'
import { IMapper } from './mapper';

class ContoMapper implements IMapper<Conto>{
    map(data: any): Conto {
        return new Conto(
            data.date,
            data.codice_tavolo,
            data.ordini,
            data.id_conto
        );
    }
}

export class ContoDAOPostgresDB implements IContoDAO {

    // questo metodo prende solo il conto senza ordinazioni...per ora
    async getContoByCodiceTavolo(codiceTavolo: string, idRistorante: number): Promise<Conto | null> {
        const client = await conn.connect();

        try {
            const result = await client.query(
                `SELECT * FROM "Conto" WHERE codice_tavolo = $1 AND id_ristorante = $2`,
                [codiceTavolo, idRistorante]
            );
            if (result.rows.length > 0) {
                return new ContoMapper().map(result.rows[0]);
            }
            else {
                return null;
            }

        }
        catch (err) {
            throw new Error(`Could not get conto. Error: ${err}`);
        }
        finally {
            client.release();
        }
    }
    async creaConto(conto: Conto, idRistorante: number): Promise<number> {
        const client = await conn.connect();

        try {
            const result = await client.query(
                `INSERT INTO "Conto" (codice_tavolo, id_ristorante) VALUES ($1, $2) RETURNING "Conto".id_conto`,
                [conto.codice_tavolo, idRistorante]
            );
            console.log(result.rows[0].id_conto);
            return result.rows[0].id_conto;
        } catch (err) {
            throw new Error(`Could not create conto. Error: ${err}`);
        } finally {
            client.release();
        }
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