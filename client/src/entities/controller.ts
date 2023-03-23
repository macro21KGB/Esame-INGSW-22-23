import { ContoDAO } from './daos/contoDAO';
import { wait } from './../utils/utils';
import { RistoranteDAO } from "./daos/ristoranteDAO";
import { Ristorante } from "./ristorante";
import { UtenteDAO } from './daos/utenteDAO';
import { OrdinazioneDAO } from './daos/ordinazioneDAO';
import { ElementoDAO } from './daos/elementoDAO';
import { CategoriaDAO } from './daos/categoriaDAO';

export class Controller {

    private static _instance: Controller;
    private ristoranteDAO: RistoranteDAO;
    private utenteDAO: UtenteDAO;
    private contoDAO: ContoDAO;
    private ordinazioneDAO: OrdinazioneDAO;
    private elementoMenuDAO: ElementoDAO;
    private categoriaDAO: CategoriaDAO;

    public static getInstance(): Controller {
        if (!this._instance) {
            this._instance = new Controller();
        }
        return this._instance;
    }

    private constructor() {
        this.ristoranteDAO = new RistoranteDAO();
        this.categoriaDAO = new CategoriaDAO();
        this.elementoMenuDAO = new ElementoDAO();
        this.utenteDAO = new UtenteDAO();
        this.contoDAO = new ContoDAO();
        this.ordinazioneDAO = new OrdinazioneDAO();
    }

    // assegna tutti i dao ad una varaibil


    public async getRistoranti(): Promise<Ristorante[]> {
        return wait(1000).then(() => this.ristoranteDAO.getRistoranti());
    }

}