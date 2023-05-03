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

const API_URL = "http://localhost:3000/api";

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
