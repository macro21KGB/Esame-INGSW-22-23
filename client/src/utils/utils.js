import { RUOLI } from "./constants";

/**
 *
 * @param {string} numeroTelefono
 * @returns {boolean} true if the phone number is valid, false otherwise
 */
export function verificaNumeroTelefono(numeroTelefono) {
	return numeroTelefono.match(/^[0-9]{10}$/) !== null;
}

/**
 *
 * @param {string} ruoloString stringa che rappresenta il ruolo
 * @returns {string} ruolo dell'utente
 */
export function stringToRuolo(ruoloString) {
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
