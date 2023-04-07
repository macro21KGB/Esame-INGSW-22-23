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

    async getConti(idRistorante: number): Promise<Conto[]> {
        type ContiQueryResult = {
            id_conto: number;
            id_ordinazione: number;
            codice_tavolo: string;
            id_ristorante: number;
            prezzo: number;
            nome: string;
            quantita: number;
            evasa: boolean;

        }
        const client = await conn.connect();
        try {
            const queryText = `select c.id_conto, c.codice_tavolo, c.id_ristorante, e.prezzo, e.nome, eo.quantita, o.evaso, o.id_ordinazione from "Conto" c JOIN "Ordinazione" o ON o.id_conto = c.id_conto JOIN "ElementoConQuantita" eo ON eo.id_ordinazione = eo.id_ordinazione  JOIN "Elemento" e ON e.id_elemento = eo.id_elemento where eo.id_ordinazione = o.id_ordinazione AND id_ristorante = $1;`
            const result = await client.query<ContiQueryResult>(queryText, [idRistorante]);


            const conti: Conto[] = [];
            for (const row of result.rows) {
                const contoInArray = conti.find(c => c.id_conto === row.id_conto);
                const elementiOrdinazione = result.rows.filter(r => r.id_ordinazione === row.id_ordinazione).map(r => {
                    return ElementoConQuantita.fromElemento(new Elemento(r.nome, "", r.prezzo, {
                        allergeni: [],
                        ingredienti: [],
                        ordine: 0,
                    }), r.quantita)
                });

                // se il conto è già presente nell'array, aggiungo l'ordinazione
                if (contoInArray) {
                    if (contoInArray.ordini.length > 0) {
                        continue;
                    }
                    contoInArray.ordini.push(new Ordinazione(row.codice_tavolo, undefined, undefined, row.evasa, elementiOrdinazione));
                }
                else {
                    const ordinazioni = [new Ordinazione(row.codice_tavolo, undefined, undefined, row.evasa, elementiOrdinazione, row.id_ordinazione)];

                    conti.push(new Conto(new Date(), row.codice_tavolo, ordinazioni, row.id_conto));
                }

            }



            return conti;

        } catch (err) {
            throw new Error(`Could not get conti. Error: ${err}`);
        }
        finally {
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