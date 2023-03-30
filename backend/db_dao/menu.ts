import { ICategoriaDAO } from '../shared/entities/daos/categoriaDAO'
import { IElementoDAO } from '../shared/entities/daos/elementoDAO'
import { IAllergeneDAO } from '../shared/entities/daos/allergeneDAO'
import { Categoria, Elemento } from '../shared/entities/menu'
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
        throw new Error("Method not implemented.");
    }
}

class ElementoDAOPostgresDB implements IElementoDAO {
    getElemento(id: number): Promise<Elemento> {
        throw new Error('Method not implemented.');
    }
    addElemento(elemento: Elemento): Promise<Elemento> {
        throw new Error('Method not implemented.');
    }
    updateElemento(elemento: Elemento): Promise<Elemento> {
        throw new Error('Method not implemented.');
    }
    deleteElemento(elemento: Elemento): Promise<Elemento> {
        throw new Error('Method not implemented.');
    }
    getAllergeniElemento(elemento: Elemento): Promise<Allergene[]> {
        throw new Error('Method not implemented.');
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