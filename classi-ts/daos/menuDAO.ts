import { Categoria, Menu } from '../menu';
import { Ristorante } from './../ristorante';

interface IMenuDAO {
    getMenu(ristorante : Ristorante): Promise<Menu[]>;    
    addMenu(ristorante: Ristorante, menu: Menu): Promise<Menu>;
    updateMenu(ristorante: Ristorante, menu: Menu): Promise<Menu>;
    deleteMenu(ristorante: Ristorante, menu: Menu): Promise<Menu>; 
}

class MenuDAO implements IMenuDAO {
    getMenu(ristorante : Ristorante): Promise<Menu[]> {
        throw new Error('Method not implemented.');
    }
    addMenu(ristorante: Ristorante, menu: Menu): Promise<Menu> {
        throw new Error('Method not implemented.');
    }
    updateMenu(ristorante: Ristorante, menu: Menu): Promise<Menu> {
        throw new Error('Method not implemented.');
    }
    deleteMenu(ristorante: Ristorante, menu: Menu): Promise<Menu> {
        throw new Error('Method not implemented.');
    }
}

export { MenuDAO };