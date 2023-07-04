import { IContoDAO } from '../shared/entities/daos/contoDAO'
import { Conto } from '../shared/entities/conto'
import { conn } from '../db_connection'
import { IMapper } from './mapper';
import { Ordinazione } from '../shared/entities/ordinazione';
import { Elemento, ElementoConQuantita } from '../shared/entities/menu';

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
                `SELECT * FROM "Conto" WHERE codice_tavolo = $1 AND id_ristorante = $2 and chiuso = 'f'`,
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

    async getConti(idRistorante: number): Promise<Conto[]> {
        type ContiQueryResult = {
            id_conto: number;
            id_ordinazione: number;
            codice_tavolo: string;
            timestamp: Date;
            id_ristorante: number;
            prezzo: number;
            nome: string;
            quantita: number;
            evaso: boolean;
            chiuso: boolean;
        }
        const client = await conn.connect();
        try {
            const queryText = `
      SELECT o.timestamp, c.id_conto, c.chiuso, c.codice_tavolo, c.id_ristorante, e.prezzo, e.nome, eo.quantita, o.evaso, o.id_ordinazione, o.evaso 
      FROM "Conto" c 
      JOIN "Ordinazione" o ON o.id_conto = c.id_conto 
      JOIN "ElementoConQuantita" eo ON eo.id_ordinazione = eo.id_ordinazione  
      JOIN "Elemento" e ON e.id_elemento = eo.id_elemento 
      WHERE eo.id_ordinazione = o.id_ordinazione 
      AND id_ristorante = $1
      AND c.data >= NOW() - INTERVAL '24 HOURS';
    `;
            const result = await client.query<ContiQueryResult>(queryText, [idRistorante]);

            const conti: Conto[] = [];
            const elementiOrdinazioneMap: { [key: number]: ElementoConQuantita[] } = {}; // map of id_ordinazione to array of ElementoConQuantita
            for (const row of result.rows) {
                const elementiOrdinazione = elementiOrdinazioneMap[row.id_ordinazione] || [];
                elementiOrdinazione.push(ElementoConQuantita.fromElemento(new Elemento(row.nome, "", row.prezzo, {
                    allergeni: [],
                    ingredienti: [],
                    ordine: 0,
                }), row.quantita));
                elementiOrdinazioneMap[row.id_ordinazione] = elementiOrdinazione;
            }

            // NON TOCCARE QUESTO CODICE!!!
            for (const row of result.rows) {
                const contoInArray = conti.find(c => c.id_conto === row.id_conto);
                const elementiOrdinazione = elementiOrdinazioneMap[row.id_ordinazione];

                if (elementiOrdinazione === undefined) continue;

                const ordinazioneToPush = new Ordinazione(row.codice_tavolo, row.timestamp, undefined, row.evaso, elementiOrdinazione, row.id_ordinazione);
                // se il conto è già presente nell'array e 
                // non hai già inserto la stessa ordinazione nell'array, aggiungo l'ordinazione
                if (contoInArray && !contoInArray.ordini.find(o => o.id === ordinazioneToPush.id)) {
                    contoInArray.ordini.push(ordinazioneToPush);
                } else {
                    const ordinazioni = [ordinazioneToPush];
                    conti.push(new Conto(new Date(), row.codice_tavolo, ordinazioni, row.id_conto, row.chiuso));
                }
                delete elementiOrdinazioneMap[row.id_ordinazione];
            }

            return conti;
        } catch (err) {
            throw new Error(`Could not get conti. Error: ${err}`);
        } finally {
            client.release();
        }
    }

    async chiudiConto(idConto: number) {
        const client = await conn.connect();

        try {
            const result = await client.query(
                `UPDATE "Conto" SET chiuso = true WHERE id_conto = $1`,
                [idConto]
            );

            return result.rowCount > 0;
        } catch (err) {
            throw new Error(`Could not close conto. Error: ${err}`);
        } finally {
            client.release();
        }
    }

    getContoByData(data: Date): Promise<Conto> {
        throw new Error('Method not implemented.');
    }
    getContiByData(data: Date): Promise<Conto[]> {
        throw new Error('Method not implemented.');
    }
    stampaConto(conto: Conto): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}