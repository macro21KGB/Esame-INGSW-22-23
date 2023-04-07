import { Conto } from './../entities/conto';
import { RUOLI } from "../entities/utente";
import jsPDF from 'jspdf';
import dayjs from 'dayjs';
import { Elemento } from '../entities/menu';
import { TokenPayload } from './constants';

// This function checks if a telephone number is valid using a regular expression
export function verificaNumeroTelefono(numeroTelefono: string): boolean {
	if (!numeroTelefono) {
		return false;
	}
	return numeroTelefono.match(/^[0-9]{10}$/) !== null;
}

export function stringToRuolo(ruoloString: string) {
	switch (ruoloString) {
		case RUOLI.ADMIN:
			return RUOLI.ADMIN;
		case RUOLI.ADDETTO_CUCINA:
			return RUOLI.ADDETTO_CUCINA;
		case RUOLI.CAMERIERE:
			return RUOLI.CAMERIERE;
		default:
			return RUOLI.ADMIN;
	}
}

/**
 * Delays the execution of the next line of code by the number of milliseconds
 * specified in the parameter. This function is an async wrapper around
 * setTimeout().
 * @param {number} ms The number of milliseconds to wait.
 * @returns {Promise<void>} A Promise that resolves once the specified number
 * of milliseconds have elapsed.
 */
export const wait = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export function verificaEmail(email: string) {
	try {
		return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
	} catch (e) {
		return false;
	}
}

/**
 * Salva il token nel cookie
 * @param token token da salvare nel cookie
 * @param tempoDiScadenza tempo di scadenza del token in secondi
 * @returns il token salvato nel cookie
 */
export function salvaTokenInCookie(token: string, tempoDiScadenza: number): string {
	const dataDiScadenza = new Date();
	dataDiScadenza.setTime(dataDiScadenza.getTime() + tempoDiScadenza * 1000);
	document.cookie = `token=${token}; expires=${dataDiScadenza.toUTCString()}; path=/`;

	return token;
}

export function getTokenDaCookie(): string {
	const token = document.cookie
		.split(";")
		.find((row) => row.trim().startsWith("token="));
	if (token) {
		return token.split("=")[1];
	}
	return "";
}

/**
 * Scrive il conto su un pdf e lo scarica
 * @param conto conto da scrivere su pdf
 */
export function scriviContoSuPDF(conto: Conto) {
	const doc = new jsPDF();

	doc.setFontSize(20);

	doc.text("Conto", 14, 22);
	doc.setFontSize(12);
	doc.text(`Numero tavolo: ${conto.codice_tavolo}`, 14, 32);
	doc.text(`Data: ${conto.data.toISOString()}`, 14, 38);
	doc.text(`Totale: €${conto.getImportoTotale()}`, 14, 44);
	doc.text(`Totale elementi: ${conto.getTotaleElementi()}`, 14, 50);

	conto.ordini.forEach((ordinazione, index) => {
		doc.text(`Ordinazione ${index + 1}`, 14, 60 + index * 6);
		doc.text(`Totale: €${ordinazione.getImporto()}`, 14, 66 + index * 6);
		doc.text(`Totale elementi: ${ordinazione.getTotaleElementi()}\n\n`, 14, 72 + index * 6);
		ordinazione.elementi.forEach((elemento, index2) => {
			doc.text(`Elemento ${index2 + 1}`, 14, 78 + index * 6 + index2 * 6);
			doc.text(`Nome: ${elemento.nome}`, 14, 84 + index * 6 + index2 * 6);
			doc.text(`Prezzo: €${elemento.prezzo}`, 14, 90 + index * 6 + index2 * 6);
			doc.text(`Quantità: ${elemento.quantita}`, 14, 96 + index * 6 + index2 * 6);
		});
	});

	doc.save(`conto_${conto.codice_tavolo}_${conto.data.toISOString()}.pdf`);

}


/**
 * Genera un array di oggetti con giorno e numero di evasi fittizi
 * @param maxDays numero di giorni da generare
 * @returns array di oggetti con giorno e numero di evasi
 */
export function generaFakeDataCharts(maxDays: number): { giorno: string, evasi: number }[] {
	const data = [];
	for (let i = 0; i < maxDays; i++) {
		data.push({
			giorno: `giorno ${i}`,
			evasi: Math.floor(Math.random() * 100),
		});
	}
	return data;
}

/**
 * Genera un oggetto con data inizio e data fine del lasso temporale
 * @param lassoTemporale lasso temporale da prendere
 * @returns {{from: Date, to: Date}} oggetto con data inizio e data fine del lasso temporale
 */
export const prendiInizioEFine = (lassoTemporale: "week" | "month" | "year"): { from: Date, to: Date } => {
	const from = dayjs().startOf(lassoTemporale).toDate();
	const to = dayjs().endOf(lassoTemporale).toDate();

	return { from, to };
}


export function rimuoviTokenDaCookie() {
	document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// da un date estrarre l'ora e i minuti nel seguente formato: hh:mm
export function getOraMinutiDaDate(date: Date | string) {

	if (typeof date === "string") {
		date = new Date(date);
	}

	const ora = date.getHours();
	const minuti = date.getMinutes();
	return `${ora < 10 ? `0${ora}` : ora}:${minuti < 10 ? `0${minuti}` : minuti}`;
}

// prese due date, restituisce la differenza in minuti e ora nel segue formato: hh:mm
export function getDifferenzaInMinuti(date1: Date | string, date2: Date | string) {

	if (typeof date1 === "string") {
		date1 = new Date(date1);
	}

	if (typeof date2 === "string") {
		date2 = new Date(date2);
	}

	const diff = Math.abs(date1.getTime() - date2.getTime());
	const diffInMinuti = Math.floor(diff / 1000 / 60);
	const ore = Math.floor(diffInMinuti / 60);
	const minuti = diffInMinuti % 60;
	return `${ore < 10 ? `0${ore}` : ore}:${minuti < 10 ? `0${minuti}` : minuti}`;
}

export function isValoriNonSettati(obj: Record<string, any>): boolean {
	for (let key in obj) {
		if (typeof obj[key] === 'string' && obj[key] === '') {
			return true;
		} else if (Array.isArray(obj[key]) && obj[key].length === 0) {
			return true;
		}
	}
	return false;
}

export class ElementiOrderSaver {

	public static salvaOrdineElementi(elementi: Elemento[]): void {
		localStorage.setItem("elementiOrdinati", JSON.stringify(elementi));
	}

	public static prendiOrdineElementi(): Elemento[] {
		const elementi = localStorage.getItem("elementiOrdinati");
		if (elementi) {
			const elementiConOrdine: Elemento[] = JSON.parse(elementi);
			const elementiOrdinati = elementiConOrdine.sort((a, b) => a.ordine - b.ordine);
			return elementiOrdinati;
		}
		return [];
	}
}


export const decodeJWTPayload = (token: string): TokenPayload => {
	const payload = token.split(".")[1];
	const decodedPayload = atob(payload);
	return JSON.parse(decodedPayload);
}