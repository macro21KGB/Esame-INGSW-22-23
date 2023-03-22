import axios from "axios";
import { toast } from "react-toastify";
import { Result, RUOLI } from "./constants";


export function verificaNumeroTelefono(numeroTelefono: string) {
	return numeroTelefono.match(/^[0-9]{10}$/) !== null;
}

export function stringToRuolo(ruoloString: string) {
	switch (ruoloString) {
		case RUOLI.ADMIN:
			return RUOLI.ADMIN;
		case RUOLI.MANAGER:
			return RUOLI.MANAGER;
		case RUOLI.ADDETTO_ALLA_CUCINA:
			return RUOLI.ADDETTO_ALLA_CUCINA;
		case RUOLI.CAMERIERE:
			return RUOLI.CAMERIERE;
		default:
			return RUOLI.NESSUNO;
	}
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function verificaEmail(email: string) {
	return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
}

export function salvaTokenInCookie(token: string, tempoDiScadenza: number) {
	const dataDiScadenza = new Date();
	dataDiScadenza.setTime(dataDiScadenza.getTime() + tempoDiScadenza * 1000);
	document.cookie = `token=${token}; expires=${dataDiScadenza.toUTCString()}; path=/`;
}

// da un date estrarre l'ora e i minuti nel seguente formato: hh:mm
export function getOraMinutiDaDate(date: Date) {
	const ora = date.getHours();
	const minuti = date.getMinutes();
	return `${ora < 10 ? `0${ora}` : ora}:${minuti < 10 ? `0${minuti}` : minuti}`;
}

// prese due date, restituisce la differenza in minuti e ora nel segue formato: hh:mm
export function getDifferenzaInMinuti(date1: Date, date2: Date) {
	const diff = Math.abs(date1.getTime() - date2.getTime());
	const diffInMinuti = Math.floor(diff / 1000 / 60);
	const ore = Math.floor(diffInMinuti / 60);
	const minuti = diffInMinuti % 60;
	return `${ore < 10 ? `0${ore}` : ore}:${minuti < 10 ? `0${minuti}` : minuti}`;
}