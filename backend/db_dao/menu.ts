import { ICategoriaDAO } from '../shared/entities/daos/categoriaDAO'
import { IElementoDAO } from '../shared/entities/daos/elementoDAO'
import { IAllergeneDAO } from '../shared/entities/daos/allergeneDAO'
import { Categoria, Elemento,OpzioniElemento } from '../shared/entities/menu'
import {conn} from '../db_connection'
import { IMapper } from './mapper';
import { Ristorante } from '../shared/entities/ristorante';
import { Allergene } from '../shared/entities/allergene';



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



class ElementoMapper implements IMapper<Elemento>{
    map(data : any) : Elemento {
        return new Elemento(data.nome, data.descrizione, data.prezzo,
            {
                ingredienti: data.ingredienti.split(',').map((s : string) => s.replace(' ', '').replace(',', '')),
                allergeni: data.allergeni, 
                ordine: 0,
            }, data.id_elemento);
    }
}

class ElementoDAOPostgresDB implements IElementoDAO {
    allergeneDAO : IAllergeneDAO = new AllergeneDAOPostgresDB();
    allergeneMapper : AllergeneMapper = new AllergeneMapper();
    elementoMapper : ElementoMapper = new ElementoMapper();
    getElementi(id_categoria: number): Promise<Elemento[]> {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM  "Elemento" where id_categoria = $1;',[id_categoria], (err : any, results : any) => {
                if (err) {
                    return reject(err);
                }
                results.rows.forEach(async (elemento : any) => {
                    elemento.allergeni = await this.allergeneDAO.getAllergeni(elemento.id_elemento);
                });

                resolve(results.rows.map((data : any) => this.elementoMapper.map(data)));
            }
            );
        });
    }
    
    addElemento(elemento: Elemento, id_categoria : number): Promise<Boolean> {
        return new Promise((resolve, reject) => {     
        conn.query('INSERT INTO "Elemento" ( id_categoria, nome, descrizione, prezzo, ingredienti) VALUES ( $1, $2, $3, $4, $5);',
        [id_categoria, elemento.nome, elemento.descrizione, elemento.prezzo as number,
            elemento.ingredienti.join(',')
        ], (err : any, results : any) => {
            if (err) {
                return reject(err);
            }
            
            // ottieni l'id dell'elemento appena inserito
            conn.query('SELECT id_elemento FROM "Elemento" ORDER BY id_elemento DESC limit 1;', (err : any, results : any) => {
                if (err) {
                    return reject(err);
                }
                
                const id = results.rows[0].id_elemento as number;
                console.log("ID"+results.rows[0].id_elemento);
                // for allergene in elemento.allergeni
                elemento.allergeni.forEach(async (allergene : Allergene) => {
                    allergene.id_elemento = id;
                    await this.allergeneDAO.addAllergene(allergene);
                });

                resolve(true);
            });
            
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
    getAllergeniElemento(id: number): Promise<Allergene[]> { 
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM  "Allergene" where id_elemento = $1;',[id], (err : any, results : any) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.rows.map((data : any) => this.allergeneMapper.map(data)));
            }
            );
        });
        
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
                results.rows.forEach(async (elemento : any) => {
                    elemento.allergeni = await this.allergeneDAO.getAllergeni(elemento.id_elemento);
                });
                
                resolve(this.elementoMapper.map(results.rows[0]));
            }
            );
        });
    }
    
    
}

class AllergeneMapper implements IMapper<Allergene>{
    map(data : any) : Allergene {
        return new Allergene(data.nome, data.id_elemento,data.id);
    }
}
//INSERT INTO "Allergene" (id_elemento, nome) VALUES (2,'farina');
class AllergeneDAOPostgresDB implements IAllergeneDAO {
    allergeneMapper : AllergeneMapper = new AllergeneMapper();
    getAllergeni(id_elemento: number): Promise<Allergene[]> {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM  "Allergene" where id_elemento = $1;',[id_elemento], (err : any, results : any) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.rows.map((data : any) => this.allergeneMapper.map(data)));
            }
            );
        }
        );
    }
    addAllergene(allergene: Allergene): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO "Allergene" (id_elemento, nome) VALUES ($1, $2);',[allergene.id_elemento, allergene.nome], (err : any, results : any) => {
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
            conn.query('DELETE FROM "Allergene" WHERE id = $1;',[id], (err : any, results : any) => {
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