import { IOrdinazioneDAO } from '../shared/entities/daos/ordinazioneDAO'
import { conn } from '../db_connection'
import { IMapper } from './mapper';
import { Ordinazione } from '../shared/entities/ordinazione';

//TODO implementare i metodi

class OrdinazioneMapper implements IMapper<Ordinazione>{
    map(data: any): Ordinazione {
        throw new Error("Method not implemented.");
    }
}

export class OrdinazioneDAOPostgresDB implements IOrdinazioneDAO {
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

    async addOrdinazione(ordinazione: Ordinazione, idConto: number): Promise<boolean> {
        const client = await conn.connect();
        try {
            const result = await client.query(
                `INSERT INTO "Ordinazione" (id_conto, evaso) VALUES ($1, $2) RETURNING id_ordinazione`,
                [idConto, false]
            );
            const idOrdinazione = result.rows[0].id_ordinazione;
            console.log(ordinazione);
            for (let i = 0; i < ordinazione.elementi.length; i++) {
                await client.query(
                    `INSERT INTO "ElementoConQuantita" (id_elemento, id_ordinazione, quantita) VALUES ($1, $2, $3)`,
                    [ordinazione.elementi[i].id_elemento, idOrdinazione, ordinazione.elementi[i].quantita]
                );
            }

            return true;
        }
        catch (err) {
            throw new Error(`Could not create conto. Error: ${err}`);
        } finally {
            client.release();
        }
    }

    updateOrdinazione(ordinazione: Ordinazione): Promise<Ordinazione> {
        throw new Error('Method not implemented.');
    }
    deleteOrdinazione(id: number): Promise<Ordinazione> {
        throw new Error('Method not implemented.');
    }

}
