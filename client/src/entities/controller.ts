import { Result } from "./../utils/constants";
import { ContoDAO } from "./daos/contoDAO";
import { wait } from "./../utils/utils";
import { RistoranteDAO } from "./daos/ristoranteDAO";
import { Ristorante } from "./ristorante";
import { UtenteDAO } from "./daos/utenteDAO";
import { OrdinazioneDAO } from "./daos/ordinazioneDAO";
import { ElementoDAO } from "./daos/elementoDAO";
import { CategoriaDAO } from "./daos/categoriaDAO";
import { Utente } from "./utente";
import { Categoria } from "./menu";
import { Conto } from "./conto";
import { dummyConto } from "./dummyObjects";

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

	public async creaRistorante(ristorante: Ristorante): Promise<Result<string>> {
		return this.ristoranteDAO.addRistorante(ristorante);
	}

	public async getRistoranti(): Promise<Ristorante[]> {
		return this.ristoranteDAO.getRistoranti();
	}

	public async getRistorante(id: number): Promise<Ristorante> {
		return wait(1000).then(() => this.ristoranteDAO.getRistorante(id));
	}

	public async registraUtente(
		email: string,
		password: string,
	): Promise<boolean> {
		return this.utenteDAO.registraUtente(email, password);
	}

	public async accediUtente(
		email: string,
		password: string,
	): Promise<Result<string>> {
		return wait(1000).then(() => this.utenteDAO.accediUtente(email, password));
	}

	public async getUtenti(): Promise<Utente[]> {
		return wait(1000).then(() => this.utenteDAO.getUtenti());
	}

	// CATEGORY

	public async getCategorie(): Promise<Categoria[]> {
		return wait(1000).then(() => this.categoriaDAO.getCategorie());
	}

	public async getCategoria(id: number): Promise<Categoria> {
		return wait(1000).then(() => this.categoriaDAO.getCategoria(id));
	}

	public async getContiTavoliUltime24h(): Promise<Result<Conto[]>>
	{
		return wait(1000).then(() => {
			return {
				success: true,
				data: [dummyConto]
			}

		});
	}
}
