import { ICategoriaDAO } from '../shared/entities/daos/categoriaDAO'
import { IElementoDAO } from '../shared/entities/daos/elementoDAO'
import { IAllergeneDAO } from '../shared/entities/daos/allergeneDAO'
import { Categoria, Elemento,OpzioniElemento } from '../shared/entities/menu'
import {conn} from '../db_connection'
import { IMapper } from './mapper';
import { Ristorante } from '@shared/entities/ristorante';
import { Allergene } from '@shared/entities/allergene';



class CategoriaMapper implements IMapper<Categoria>{
    map(data : any) : Categoria {
        return new Categoria(data.nome, data.elementi || [], data.id_categoria,data.id_ristorante);
    }
}

class CategoriaDAOPostgresDB implements ICategoriaDAO {
    categoriaMapper : CategoriaMapper = new CategoriaMapper();
    getCategoria(idCategoria: number): Promise<Categoria | null> {
        return new Promise((resolve, reject) => {
			conn.query('SELECT * FROM  "Categoria" where id_categoria = $1;',[idCategoria], (err : any, results : any) => {

				if (err) {
					return reject(err);
				}
                if (results.rows.length == 0) {
                    return resolve(null);
                }
				resolve(results.rows[0].map((data : any) => this.categoriaMapper.map(data)));
			});
		});
    }
    getCategorie(id_ristorante: number): Promise<Categoria[]> {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM  "Categoria" where id_ristorante = $1;',[id_ristorante], (err : any, results : any) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.rows.map((data : any) => this.categoriaMapper.map(data)));
            }
            );
        });
    }
    addCategoria(categoria: Categoria): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO "Categoria" (nome, id_ristorante) VALUES ($1, $2);',[categoria.nome, categoria.id_ristorante], (err : any, results : any) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            }
            );
        });
    }
    updateCategoria(id_categoria: number, nuovo_nome : string): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE "Categoria" SET nome = $1 WHERE id_categoria = $2;',[nuovo_nome, id_categoria], (err : any, results : any) => {
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
            conn.query('DELETE FROM "Categoria" WHERE id_categoria = $1;',[id_categoria], (err : any, results : any) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            }
            );
        });

    }
    getElementiCategoria(id_categoria: number): Promise<Elemento[]> {
        throw new Error('Method not implemented.')
    }
}


// TODO implementare metodi elemento
class ElementoMapper implements IMapper<Elemento>{
    map(data : any) : Elemento {
        return new Elemento(data.nome, data.descrizione, data.prezzo,
            {
                ingredienti: data.ingredienti.split(',').map((s : string) => s.replace(' ', '').replace(',', '')),
                allergeni: [], // TODO
                ordine: 0,
            }, data.id_elemento);
    }
}

class ElementoDAOPostgresDB implements IElementoDAO {
    getElementi(id_categoria: number): Promise<Elemento[]> {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM  "Elemento" where id_categoria = $1;',[id_categoria], (err : any, results : any) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.rows.map((data : any) => this.elementoMapper.map(data)));
            }
            );
        });
    }
    elementoMapper : ElementoMapper = new ElementoMapper();
    addElemento(elemento: Elemento, id_categoria : number): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO "Elemento" ( id_categoria, nome, descrizione, prezzo, ingredienti) VALUES ( $1, $2, $3, $4, $5);',
            [id_categoria, elemento.nome, elemento.descrizione, elemento.prezzo,
                elemento.ingredienti.join(',')
               ], (err : any, results : any) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            }
            );
        });
    }
    updateElemento(id: number, elemento: Elemento): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE "Elemento" SET nome = $1, descrizione = $2, prezzo = $3, ingredienti = $4 WHERE id_elemento = $5;',
            [ elemento.nome, elemento.descrizione, elemento.prezzo,
                elemento.ingredienti.join(','), id
               ], (err : any, results : any) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            }
            );
        });
    }
    deleteElemento(id: number): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM "Elemento" WHERE id_elemento = $1;',[id], (err : any, results : any) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            }
            );
        });
    }
    getAllergeniElemento(id: number): Promise<Allergene[]> { // TODO
        throw new Error('Method not implemented.')
    }
    getElemento(id: number): Promise<Elemento | null> {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM  "Elemento" where id_elemento = $1;',[id], (err : any, results : any) => {
                if (err) {
                    return reject(err);
                }
                if (results.rows.length == 0) {
                    return resolve(null);
                }
                resolve(this.elementoMapper.map(results.rows[0]));
            }
            );
        });
    }
    
    
}
// TODO implementare metodi allergene
class AllergeneMapper implements IMapper<Allergene>{
    map(data : any) : Allergene {
        throw new Error("Method not implemented.");
    }
}

class AllergeneDAOPostgresDB implements IAllergeneDAO {
    getAllergeni(id_elemento: number): Promise<Allergene[]> {
        throw new Error('Method not implemented.')
    }
    addAllergene(allergene: Allergene): Promise<Boolean> {
        throw new Error('Method not implemented.')
    }
    deleteAllergene(id: number): Promise<Boolean> {
        throw new Error('Method not implemented.')
    }

}

export { CategoriaDAOPostgresDB, ElementoDAOPostgresDB }