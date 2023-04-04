import { IOrdinazioneDAO } from '../shared/entities/daos/ordinazioneDAO'
import { conn } from '../db_connection'
import { IMapper } from './mapper';
import { Ordinazione } from '../shared/entities/ordinazione';
import { Elemento, ElementoConQuantita } from '../shared/entities/menu';

//TODO implementare i metodi

class OrdinazioneMapper implements IMapper<Ordinazione>{
    map(data: any): Ordinazione {
        throw new Error("Method not implemented.");
    }
}

export class OrdinazioneDAOPostgresDB implements IOrdinazioneDAO {
    async getOrdinazioni(idRistorante: number, evase: boolean): Promise<Ordinazione[]> {
        const client = await conn.connect();

        try {
            const result = await client.query('SELECT "Ordinazione".*, "Conto".codice_tavolo FROM "Ordinazione" INNER JOIN "Conto" ON "Ordinazione".id_conto = "Conto".id_conto WHERE "Conto".id_ristorante = $1 AND "Ordinazione".evaso = $2', [idRistorante, evase]);
            console.log(result.rows);
            // per ogni ordinazione, prendo i suoi elementi
            for (let i = 0; i < result.rows.length; i++) {
                console.log(result.rows[i]);
                const ordinazioneCorrente = new Ordinazione(result.rows[i].codice_tavolo, result.rows[i].timestamp, result.rows[i].evasoDa, result.rows[i].evaso, []);
                const elementi = await client.query<ElementoConQuantita & Elemento>('SELECT "ElementoConQuantita".*, "Elemento".nome, "Elemento".prezzo FROM "ElementoConQuantita" INNER JOIN "Elemento" ON "ElementoConQuantita".id_elemento = "Elemento".id_elemento WHERE "ElementoConQuantita".id_ordinazione = $1;', [result.rows[i].id_ordinazione]);

                for (let j = 0; j < elementi.rows.length; j++) {
                    ordinazioneCorrente.elementi.push(new ElementoConQuantita(elementi.rows[j].nome, elementi.rows[j].descrizione, elementi.rows[j].prezzo, [], [], elementi.rows[j].quantita));
                }

                result.rows[i] = ordinazioneCorrente;

            }
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get ordinazioni. Error: ${err}`);
        } finally {
            client.release();
        }
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
