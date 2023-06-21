import { Ordinazione } from "../entities/ordinazione";
import { RUOLI } from "../entities/utente";

const COLORS = {
	primaryBackgroundColor: "#14213D",
	accentBackgroundColor: "#0E1933",

	primaryTextColor: "white",
	primaryBackgroundItemColor: "#263657",

	primaryColor: "#FCA311",

	dangerColor: "#EF3636",
};

export interface TokenPayload {
	id: number,
	nome: string,
	cognome: string,
	email: string,
	ruolo: RUOLI
	supervisore: boolean
}

export type DateString = `${number}-${number}-${number}`

export type InfoGiorno = {
	giorno: DateString;
	numero_ordinazioni: number;
}

export const AppEvents = {
	ERROR: 'error',
	LOGIN: 'login',
	LOGOUT: 'logout',
	REGISTER: 'register',
	CLICKED_ON_RESTURANT: 'clicked_on_resturant',
	ADD_USER_TO_RESTURANT: 'add_user_to_resturant',
	MODIFY_USER_IN_RESTURANT: 'modify_user_to_resturant',
	ADD_RESTURANT: 'add_resturant',
	ADD_CATEGORY: 'add_category',
	ADD_ELEMENT_TO_CATEGORY: 'add_element_to_category',
	DELETE_ELEMENT_FROM_CATEGORY: 'delete_element_from_category',
	MODIFY_ELEMENT_FROM_CATEGORY: 'modify_element_from_category',
	START_TAKING_ORDER: 'start_taking_order',
	SEND_ORDER: 'send_order_to_kitchen',
	COMPLETE_ORDER: 'complete_order',
	PRINT_ORDER: 'print_order',
	OPEN_STATISTICS: 'open_statistics',
} as const;


export const ALLERGENI = {
	GLUTINE: "glutine",
	LATTOSIO: "lattosio",
	UOVO: "uovo",
	PESCE: "pesce",
	FRUTTA_A_GUSCIO: "frutta a guscio",
	ARACHIDI: "arachidi",
	SOIA: "soia",
	SESAMO: "sesamo",
} as const;

const API_URL = "http://209.38.197.162:3000/api";

export interface Result<T> {
	success: boolean;
	data: T;
}

export type OrdinazioneConCodice = Ordinazione & { codiceTavolo: string };


export interface LoginPayload {
	token: string;
	ruolo: RUOLI;
	supervisore: boolean;
}

export { COLORS, API_URL };
