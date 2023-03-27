import { rejects } from 'assert';
import { IRistoranteDAO } from '../shared/entities/daos/ristoranteDAO'
import { Ristorante } from '../shared/entities/ristorante'
import {conn} from '../db_connection'
import { IMapper } from './mapper';

class RistoranteMapper implements IMapper<Ristorante>{
    map(data : any) : Ristorante {
        return new Ristorante(
            data.id_ristorante,
            data.nome,
            data.indirizzo,
            data.telefono,
            data.sito_web,
            data.foto_path,
            { camerieri: [], addettiAllaCucina: [] },
        );
    }
}

class RistoranteDAOPostgresDB implements IRistoranteDAO {
    ristoranteMapper : RistoranteMapper = new RistoranteMapper();
    getRistoranti(): Promise<Ristorante[]> {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM "Ristorante";', (err : any, res : any) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(res.rows.map((data : any) => this.ristoranteMapper.map(data)));
                }
            })
        })
    }
    getRistorante(id: number): Promise<Ristorante | null> {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM "Ristorante" WHERE id_ristorante = $1;', [id], (err : any, res : any) => {
                if (err) {
                    
                    return reject(err);
                } else {
                    if (res.rows.length == 0) {
                        return resolve(null);
                    }
                    resolve(this.ristoranteMapper.map(res.rows[0]));
                }
            })
        }
        );

    }
    addRistorante(ristorante: Ristorante): Promise<Boolean> {
        // INSERT INTO "Ristorante" ( nome, indirizzo, telefono, sito_web, foto_path) VALUES ( 'Ristorante 1', 'Via Roma 1', '3333333333', 'www.ristorante1.it', 'foto1.jpg');
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO "Ristorante" ( nome, indirizzo, telefono, sito_web, foto_path) VALUES ( $1, $2, $3, $4, $5) RETURNING *;', 
            [ristorante.nome, ristorante.indirizzo, ristorante.telefono, ristorante.sitoWeb, ristorante.fotoPath], 
            (err : any, res : any) => {
                if (err) {
                    return reject(false);
                }
                // TODO deve ritornare false se non è stato inserito nulla
                resolve(true);
            }
        ); 
        });
    }
    updateRistorante(ristorante: Ristorante): Promise<Ristorante> {
        throw new Error('Method not implemented.');
    }
    deleteRistorante(id: number): Promise<Ristorante> {
        throw new Error('Method not implemented.');
    }
    
}

export { RistoranteDAOPostgresDB,RistoranteMapper };