import { LoginPayload, Result } from "./../utils/constants";
import { ContoDAO } from "./daos/contoDAO";
import { generaFakeDataCharts, wait } from "./../utils/utils";
import { RistoranteDAO } from "./daos/ristoranteDAO";
import { Ristorante } from "./ristorante";
import { UtenteDAO } from "./daos/utenteDAO";
import { OrdinazioneDAO } from "./daos/ordinazioneDAO";
import { ElementoDAO } from "./daos/elementoDAO";
import { CategoriaDAO } from "./daos/categoriaDAO";
import { Utente } from "./utente";
import { Categoria, Elemento } from "./menu";
import { Conto } from "./conto";
import { dummyConto } from "./dummyObjects";
import { InformazioniUtente } from "../routes/GestisciUtenza";

export class Controller {
	getRistoranteAttuale(): Promise<Ristorante> {
		return this.ristoranteDAO.getRistoranteAttuale();
	}
	spostaElementiCategoria(idElemento1: number, idElemento2: number): Promise<Result<string>> {
		return this.elementoMenuDAO.scambiaElementi(idElemento1, idElemento2);
	}

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

	public async getRistorante(id: number): Promise<Ristorante | null> {
		return this.ristoranteDAO.getRistorante(id);
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
	): Promise<Result<LoginPayload>> {
		return this.utenteDAO.accediUtente(email, password);
	}


	modificaUtenteConInformazioniUtente(infoUtente: InformazioniUtente): Promise<Result<string>> {
		return this.utenteDAO.updateUtente(infoUtente);
	}


	cambiaPasswordDefault(nuovaPassword: string) {
		return this.utenteDAO.cambiaPasswordDefault(nuovaPassword);
	}

	isUtenteUsingDefaultPassword(): Promise<boolean> {
		return this.utenteDAO.isUtenteUsingDefaultPassword();
	}

	creaUtenteConInformazioniUtente(infoUtente: any, idRistorante: number): Promise<Result<string>> {
		return this.utenteDAO.addUtente(infoUtente, idRistorante);
	}

	public async getUtenti(idRistorante: number): Promise<InformazioniUtente[]> {
		return this.utenteDAO.getUtenti(idRistorante);
	}

	// CATEGORY

	public async getCategorie(idRistorante: number): Promise<Categoria[]> {
		return this.categoriaDAO.getCategorie(idRistorante);
	}

	public async getCategoria(idRistorante: number): Promise<Categoria> {
		return this.categoriaDAO.getCategoria(idRistorante);
	}

	public async getElementiCategoria(idCategoria: number): Promise<Elemento[]> {
		return this.elementoMenuDAO.getElementi(idCategoria);
	}

	eliminaElementoCategoria(idElemento: number): Promise<Result<string>> {
		return this.elementoMenuDAO.deleteElemento(idElemento);
	}
	aggiungiElementoCategoria(elemento: Elemento, idCategoria: number): Promise<Result<string>> {
		return this.elementoMenuDAO.addElemento(elemento, idCategoria)
	}
	modificaElementoCategoria(elemento: Elemento, idCategoria: number): Promise<Result<string>> {
		throw new Error("Method not implemented.");
	}

	// CONTI

	public async getContiTavoliUltime24h(idRistorante: number): Promise<Result<Conto[]>> {
		return wait(1000).then(() => {
			return {
				success: true,
				data: [dummyConto]
			}

		});
	}

	public async chiudiConto(conto: Conto): Promise<Result<string>> {
		return wait(1000).then(() => {
			return {
				success: true,
				data: "Conto chiuso"
			}
		});
	}

	getNumeroOrdiniEvasiPerUtente(selectedUserEmail: string, from: Date, to: Date): any {
		return wait(1000).then(() => {
			return {
				success: true,
				data: generaFakeDataCharts(7),
			}
		});
	}

}
