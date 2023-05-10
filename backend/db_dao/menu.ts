import { ICategoriaDAO } from '../shared/entities/daos/categoriaDAO'
import { IElementoDAO } from '../shared/entities/daos/elementoDAO'
import { IAllergeneDAO } from '../shared/entities/daos/allergeneDAO'
import { Categoria, Elemento, ElementoConQuantita, OpzioniElemento } from '../shared/entities/menu'
import { conn } from '../db_connection'
import { IMapper } from './mapper';
import { Ristorante } from '../shared/entities/ristorante';
import { Allergene } from '../shared/entities/allergene';



class CategoriaMapper implements IMapper<Categoria>{
    map(data: any): Categoria {
        return new Categoria(data.nome, data.elementi || [], data.id_categoria, data.id_ristorante);
    }
}

class CategoriaDAOPostgresDB implements ICategoriaDAO {
    categoriaMapper: CategoriaMapper = new CategoriaMapper();
    elementoDAO: IElementoDAO = new ElementoDAOPostgresDB();
    getCategoria(idCategoria: number): Promise<Categoria | null> {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM  "Categoria" where id_categoria = $1;', [idCategoria], (err: any, results: any) => {

                if (err) {
                    return reject(err);
                }
                if (results.rows.length == 0) {
                    return resolve(null);
                }
                resolve(results.rows[0].map((data: any) => this.categoriaMapper.map(data)));
            });
        });
    }
    getCategorie(id_ristorante: number): Promise<Categoria[]> {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM  "Categoria" where id_ristorante = $1;', [id_ristorante], (err: any, results: any) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.rows.map((data: any) => this.categoriaMapper.map(data)));
            }
            );
        });
    }
    addCategoria(categoria: Categoria): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO "Categoria" (nome, id_ristorante) VALUES ($1, $2);', [categoria.nome, categoria.id_ristorante], (err: any, results: any) => {
                if (err) {
                    return reject(err);
                }

                resolve(true);
            }
            );
        });
    }
    updateCategoria(id_categoria: number, nuovo_nome: string): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE "Categoria" SET nome = $1 WHERE id_categoria = $2;', [nuovo_nome, id_categoria], (err: any, results: any) => {
                if (err) {
                    return reject(err);
                }

                resolve(true);
            }
            );
        });
    }
    deleteCategoria(id_categoria: number): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            conn.query('SELECT id_elemento FROM "Elemento" WHERE id_categoria = $1;', [id_categoria], (err: any, results: any) => {
                if (err) {
                    return reject(err);
                }
                results.rows.forEach(async (elemento: any) => {
                    await this.elementoDAO.deleteElemento(elemento.id_elemento as number);
                });
                conn.query('DELETE FROM "Categoria" WHERE id_categoria = $1;', [id_categoria], (err: any, results: any) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(true);
                }
                );
            });
        });

    }
    getElementiCategoria(id_categoria: number): Promise<Elemento[]> {
        throw new Error('Method not implemented.')
    }
}



class ElementoMapper implements IMapper<Elemento>{
    map(data: any): Elemento {
        return new Elemento(data.nome, data.descrizione, data.prezzo,
            {
                ingredienti: data.ingredienti || [],
                allergeni: data.allergeni || [],
                ordine: data.ordine,
            }, data.id_elemento);
    }
}

class ElementoDAOPostgresDB implements IElementoDAO {

    allergeneMapper: AllergeneMapper = new AllergeneMapper();
    elementoMapper: ElementoMapper = new ElementoMapper();

    async getElementi(id_categoria: number): Promise<Elemento[]> {
        const elementi: Elemento[] = [];
        try {
            const queryText = `SELECT "Elemento".*, "Allergene".nome AS allergene_nome FROM "Elemento" LEFT JOIN "Allergene" ON "Elemento".id_elemento = "Allergene".id_elemento
            WHERE "Elemento".id_categoria = $1 ORDER BY ordine;`;
            const result = await conn.query(queryText, [id_categoria]);

            result.rows.forEach((row: any) => {
                const elemento = elementi.find((e: Elemento) => e.id_elemento == row.id_elemento);

                // Se l'elemento è già presente nell'array, aggiungo l'allergene
                if (elemento) {
                    if (row.allergene_nome) {
                        elemento.allergeni.push(new Allergene(row.allergene_nome, elemento.id_elemento, row.id_allergene));
                    }
                }
                // Altrimenti lo creo e lo aggiungo all'array
                else {
                    const e = this.elementoMapper.map(row);
                    if (row.allergene_nome) {
                        e.allergeni.push(new Allergene(row.allergene_nome, e.id_elemento, row.id_allergene));
                    }
                    elementi.push(e);
                }
            });
            return elementi;

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    addElemento(elemento: Elemento, id_categoria: number): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO "Elemento" ( id_categoria, nome, descrizione, prezzo, ingredienti) VALUES ( $1, $2, $3, $4, $5);',
                [id_categoria, elemento.nome, elemento.descrizione, elemento.prezzo as number,
                    elemento.ingredienti.join(',')
                ], (err: any, results: any) => {
                    if (err) {
                        return reject(err);
                    }

                    // ottieni l'id dell'elemento appena inserito
                    conn.query('SELECT id_elemento FROM "Elemento" ORDER BY id_elemento DESC limit 1;', (err: any, results: any) => {
                        if (err) {
                            return reject(err);
                        }

                        const id = results.rows[0].id_elemento as number;

                        // inserisci gli allergeni dell'elemento
                        elemento.allergeni.forEach((allergene: Allergene) => {
                            conn.query('INSERT INTO "Allergene" (id_elemento, nome) VALUES ($1, $2);', [id, allergene.nome], (err: any, results: any) => {
                                if (err) {
                                    return reject(err);
                                }
                            }
                            );
                        });
                        resolve(true);
                    });

                }
            );
        });

    }

    async scambiaOrdineElementi(idElemento1: number, idElemento2: number): Promise<Boolean> {
        if (idElemento1 == idElemento2)
            return false;
        try {
            await conn.query('BEGIN;');
            const update1Text = 'UPDATE "Elemento" SET ordine = ordine + 1 WHERE id_elemento = $1;';
            await conn.query(update1Text, [idElemento1]);

            const update2Text = 'UPDATE "Elemento" SET ordine = ordine - 1 WHERE id_elemento = $1;';
            await conn.query(update2Text, [idElemento2]);

            await conn.query('COMMIT;');
            return true;

        } catch (err) {
            await conn.query('ROLLBACK;');
            throw err;
        }
    }
    updateElemento(idElemento: number, elemento: Elemento): Promise<Boolean> {
        const allergeneDAO = new AllergeneDAOPostgresDB();
        return new Promise((resolve, reject) => {
            conn.query('UPDATE "Elemento" SET nome = $1, descrizione = $2, prezzo = $3, ingredienti = $4 WHERE id_elemento = $5;',
                [elemento.nome, elemento.descrizione, elemento.prezzo,
                elemento.ingredienti.join(','), idElemento
                ], (err: any, results: any) => {
                    if (err) {
                        return reject(err);
                    }

                    // reset allergeni
                    conn.query('DELETE FROM "Allergene" WHERE id_elemento = $1;', [idElemento], (err: any, results: any) => {
                        if (err) {
                            return reject(err);
                        }
                        //@ts-ignore
                        const allergeniElementi = elemento.allergeni.map((allergene: string) => {
                            return new Allergene(allergene, idElemento, idElemento);
                        });

                        allergeniElementi.forEach((allergene: Allergene) => {
                            allergeneDAO.addAllergene(allergene);
                        });

                        resolve(true);
                    });
                }
            );
        });
    }
    deleteElemento(id: number): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            // cancella gli allergeni dell'elemento prima di cancellare l'elemento
            conn.query('DELETE FROM "Allergene" WHERE id_elemento = $1;', [id], (err: any, results: any) => {
                if (err) {
                    return reject(err);
                }

                conn.query('DELETE FROM "Elemento" WHERE id_elemento = $1;', [id], (err: any, results: any) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(true);
                }
                );
            });
        });
    }
    getAllergeniElemento(id: number): Promise<Allergene[]> {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM  "Allergene" where id_elemento = $1;', [id], (err: any, results: any) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.rows.map((data: any) => this.allergeneMapper.map(data)));
            }
            );
        });

    }
    getElemento(id: number): Promise<Elemento | null> {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM  "Elemento" where id_elemento = $1;', [id], (err: any, results: any) => {
                if (err) {
                    return reject(err);
                }
                if (results.rows.length == 0) {
                    return resolve(null);
                }

                conn.query(`SELECT "Elemento".*, "Allergene".nome as nome_allergene, id as id_allergene FROM
                ("Elemento" inner join "Allergene" on "Elemento".id_elemento = "Allergene".id_elemento) 
                where "Elemento".id_elemento = $1;`, [id], (err: any, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.rows.length == 0) {
                        return resolve(null);
                    }

                    let elementi: Elemento[] = [];
                    results.rows.map((result: any) => {
                        elementi.push(this.elementoMapper.map(result));
                        const e = elementi.find((e: Elemento) => e.id_elemento == result.id_elemento);
                        if (e) {
                            e.allergeni.push(new Allergene(result.nome_allergene, e.id_elemento, result.id_allergene));
                        }
                    });
                    console.table(elementi);
                    resolve(this.elementoMapper.map(elementi[0]));
                });


                //resolve(this.elementoMapper.map(results.rows[0]));
            }
            );
        });
    }


}

class AllergeneMapper implements IMapper<Allergene>{
    map(data: any): Allergene {
        return new Allergene(data.nome, data.id_elemento, data.id);
    }
}
//INSERT INTO "Allergene" (id_elemento, nome) VALUES (2,'farina');
class AllergeneDAOPostgresDB implements IAllergeneDAO {
    allergeneMapper: AllergeneMapper = new AllergeneMapper();


    getAllergeni(id_elemento: number): Promise<Allergene[]> {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM  "Allergene" where id_elemento = $1 ORDER BY id;', [id_elemento], (err: any, results: any) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.rows.map((data: any) => this.allergeneMapper.map(data)));
            }
            );
        }
        );
    }

    addAllergene(allergene: Allergene): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO "Allergene" (id_elemento, nome) VALUES ($1, $2);', [allergene.id_elemento, allergene.nome], (err: any, results: any) => {
                if (err) {
                    return reject(err);
                }

                resolve(true);
            }
            );
        });
    }
    deleteAllergene(id: number): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM "Allergene" WHERE id = $1;', [id], (err: any, results: any) => {
                if (err) {
                    return reject(err);
                }

                resolve(true);
            }
            );
        });
    }

}

export { CategoriaDAOPostgresDB, ElementoDAOPostgresDB, AllergeneDAOPostgresDB }