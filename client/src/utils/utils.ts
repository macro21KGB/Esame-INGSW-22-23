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