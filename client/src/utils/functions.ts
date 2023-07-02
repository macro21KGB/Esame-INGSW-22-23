import { Conto } from '../entities/conto';
import { RUOLI } from "../entities/utente";
import jsPDF from 'jspdf';
import dayjs from 'dayjs';
import { DateString, InfoGiorno, POSSIBLE_ROUTES_FOR_TYPES, TokenPayload } from './constants';
import { redirect } from 'react-router';
import { func } from 'prop-types';

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
	const w = 200;
	const h = 380;
	const doc = new jsPDF('p', 'mm', [w, h]);//new jsPDF();
	
	const contoAttuale = Conto.fromContoJSON(conto);

	doc.setFontSize(20);

	doc.text("Conto", 14, 22);
	doc.setFontSize(12);
	doc.text(`Numero tavolo: ${contoAttuale.codice_tavolo}`, 14, 32);
	const dataConOraAttuale = dayjs(contoAttuale.data).format("DD/MM/YYYY HH:mm:ss");

	

	doc.text(`Data: ${dataConOraAttuale}`, 14, 38);

	doc.text(`Importo totale: ${contoAttuale.getImportoTotale()}`, 14, 48);
	doc.text(`Totale elementi: ${contoAttuale.getTotaleElementi()}`, 14, 58);
	
	// SIMLE FACE
	const origin = [w/2 , h/2 -50];
	const radius = 50;
	// head
	doc.circle(origin[0], origin[1], radius);

	// eye balls
	const leftEyeCenter = [origin[0] - radius / 3, origin[1] - radius / 3];
	const rightEyeCenter = [origin[0] + radius / 3, origin[1] - radius / 3];
	const eyeRadius = radius / 10;
	doc.circle(leftEyeCenter[0], leftEyeCenter[1], eyeRadius);
	doc.circle(rightEyeCenter[0], rightEyeCenter[1], eyeRadius);
	
	let prevX, prevY;
	let x,y;
	// smile
	let xSpread = 1.2;
	for(let i = 0; i <= Math.PI; i+= Math.PI/20) {
		x= origin[0] - (radius/2* xSpread) * Math.cos(i);
		y= origin[1] - (radius/2 +5) * Math.sin(-i);
		//doc.circle(x, y, 1);
		if (prevX && prevY && x && y) {
			doc.line(prevX, prevY, x, y);
		}
		prevX = x;
		prevY = y;
	}
	doc.addPage();

	const offsetX = 14;
	const offsetY = 14;
	const lineSpacing = 10;
	let sum_height_page = offsetY;

	function setBold() {
		doc.setFont('','bold');	
	}

	function setNormal() {
		doc.setFont('','normal');
	}
	function appendLine(text: string, offsetX : number = 14) {
		doc.text(text, offsetX, sum_height_page);
		sum_height_page += lineSpacing;
		if(sum_height_page > h) {
			sum_height_page = offsetY;
			doc.addPage();
		}
	}

	contoAttuale.ordini.forEach((ordinazione, ord_index) => {
		setBold();
		appendLine(`Ordinazione ${ord_index + 1}:`);
		setNormal();
		ordinazione.elementi.forEach((elemento, el_index) => {
			setBold();
			appendLine(`Elemento ${el_index + 1}:`, offsetX*2);
			setNormal();
			appendLine(`- Nome: ${elemento.nome}`, offsetX*3);
			appendLine(`- Prezzo: €${elemento.prezzo}`, offsetX*3);
			appendLine(`- Quantità: ${elemento.quantita}`, offsetX*3);
		});
		
		setBold();
		appendLine(`- Totale ordine: €${ordinazione.getImporto()}`);
		appendLine(`- Totale elementi ordinati: ${ordinazione.getTotaleElementi()}`);
		setNormal();
		sum_height_page += lineSpacing;
	});

	doc.save(`contoAttuale_${contoAttuale.codice_tavolo}_${contoAttuale.data}.pdf`);

}



/**
 * Genera un array di oggetti con giorno e numero di evasi fittizi
 * @param maxDays numero di giorni da generare
 * @returns array di oggetti con giorno e numero di evasi
 */
export function generaFakeDataCharts(maxDays: number) {
	const data = [];
	for (let i = 0; i < maxDays; i++) {
		data.push({
			giorno: `giorno ${i}`,
			numero_ordini: Math.floor(Math.random() * 100),
		});
	}
	return data;
}

export type ISOString = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;

/**
 * Genera un oggetto con data inizio e data fine del lasso temporale
 * @param lassoTemporale lasso temporale da prendere
 * @returns {{from: Date, to: Date}} oggetto con data inizio e data fine del lasso temporale
 */
export const prendiInizioEFine = (lassoTemporale: "today" | "week" | "month" | "year"): { from: string, to: string } => {

	if (lassoTemporale === "today")
		return { from: new Date().toISOString(), to: new Date().toISOString() };

	const from = dayjs().startOf(lassoTemporale).toISOString();
	const to = dayjs().endOf(lassoTemporale).toISOString();
	return { from, to };
}


export function rimuoviTokenDaCookie() {
	document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// da un date estrarre l'ora e i minuti nel seguente formato: hh:mm
export function getOraMinutiDaDate(date: Date | string) {
	return dayjs(date).format("HH:mm");
}

// prese due date, restituisce la differenza in minuti e ora nel segue formato: hh:mm
export function getDifferenzaTempo(date1: Date | string, date2: Date | string) {
	const diff = dayjs(date2).diff(dayjs(date1), "second");
	const ore = Math.floor(diff / 3600);
	const minuti = Math.floor((diff % 3600) / 60);
	const secondi = diff % 60;

	if (ore >= 1) {
		return "+1h!";
	} else {
		return `${addZeroPrefix(minuti)}:${addZeroPrefix(secondi)}`;
	}
}

export function isValoriNonSettati(obj: Record<string, any>, except?: string[]): boolean {
	for (let key in obj) {
		if (except?.includes(key))
			continue;

		if (typeof obj[key] === 'string' && obj[key] === '') {
			return true;
		} else if (Array.isArray(obj[key]) && obj[key].length === 0) {
			return true;
		}
	}
	return false;
}

isValoriNonSettati({ a: "uno", b: "due" }, ["a"]);

export function convertToDateString(date: Date): DateString {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function convertFullDateStringToDateString(date: string): DateString {
	if (date === undefined) {
		return "2001-06-24";
	}

	return date.split("T")[0] as DateString;
}

const addZeroPrefix = (num: number): string => {
	return num < 10 ? `0${num}` : `${num}`;
};

export const createInfoGiorniFromDateToDate = (from: Date, to: Date, completati: InfoGiorno[]): InfoGiorno[] => {


	const result: InfoGiorno[] = [];
	let completatiIndex = 0;
	for (let i = from; i <= to; i.setDate(i.getDate() + 1)) {
		const currentDateString = `${i.getFullYear()}-${addZeroPrefix(i.getMonth() + 1)}-${addZeroPrefix(i.getDate())}` as DateString;
		const currentCompletatiDateString = convertFullDateStringToDateString(completati[completatiIndex]?.giorno)
		if (currentDateString == currentCompletatiDateString) {
			result.push({
				giorno: currentCompletatiDateString,
				numero_ordinazioni: +completati[completatiIndex].numero_ordinazioni
			});
			completatiIndex++;
		}
		else {
			result.push({
				giorno: currentDateString,
				numero_ordinazioni: 0
			});
		}
	}

	return result;
};

export function isContoClosed(conto: Conto) {
	return conto.ordini.every(ordinazione => ordinazione.evaso === true);
}

// controlla quanto sono simili due stringhe
export function stringSimilarity(str1: string, str2: string): number {
	const set1 = new Set(str1.split(""));
	const set2 = new Set(str2.split(""));
	const intersection = new Set([...set1].filter(char => set2.has(char)));
	const union = new Set([...set1, ...set2]);
	return intersection.size / union.size;
}

export const extractJWTTokenPayload = (token: string): TokenPayload => {
	const payload = token.split(".")[1];
	const decodedPayload = window.atob(payload);
	return JSON.parse(decodedPayload);
}

type ObjectsKey<TObj> = keyof TObj;

export function isAllFieldDefined<T extends Record<string, any>>(obj: T, except?: ObjectsKey<T>[]) {
	let isAllOk = true;

	Object.keys(obj).forEach(currentKey => {
		const currentValue = obj[currentKey];
		if (currentValue === null || currentValue === "" || currentValue === undefined || currentValue?.length === 0)

			if (!except?.includes(currentKey))
				isAllOk = false;
	})

	return isAllOk;
}

export const wait = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export function verificaEmail(email: string) {
	try {
		return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
	} catch (e) {
		return false;
	}
}


export function getDefaultHomePageForUserOfType({ ruolo, supervisore }: { ruolo: RUOLI, supervisore: boolean }) {
	if (supervisore) {
		return "/supervisore";
	}

	if (ruolo === RUOLI.ADDETTO_CUCINA) {
		return "/cucina";
	}
	else if (ruolo === RUOLI.CAMERIERE) {
		return "/ordinazione";
	}
	else if (ruolo === RUOLI.ADMIN) {
		return "/dashboard";
	}

	return "/login";
}

export async function redirectIfUserTypeIsNot(userType: RUOLI) {
	const token = getTokenDaCookie();
	if (token === null) {
		return null;
	}

	const payload = extractJWTTokenPayload(token);
	const { ruolo, supervisore } = payload;

	//@ts-ignore
	if (POSSIBLE_ROUTES_FOR_TYPES[userType].includes(window.location.pathname)) {
		return null;
	}

	const defaultHomePage = getDefaultHomePageForUserOfType({ ruolo, supervisore });
	console.log("redirecting to", defaultHomePage);
	return redirect(defaultHomePage);
}
