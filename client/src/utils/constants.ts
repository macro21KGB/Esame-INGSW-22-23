import { RUOLI } from "../entities/utente";

const COLORS = {
	primaryBackgroundColor: "#14213D",
	accentBackgroundColor: "#0E1933",

	primaryTextColor: "white",
	primaryBackgroundItemColor: "#263657",

	primaryColor: "#FCA311",

	dangerColor: "#EF3636",
};

export const ALLERGENI = {
	GLUTINE: "glutine",
	LATTOSIO: "lattosio",
	UOVO: "uovo",
	PESCE: "pesce",
	FRUTTA_A_GUSCIO: "frutta a guscio",
	ARACHIDI: "arachidi",
	SOIA: "soia",
	SESAMO: "sesamo",
};

const API_URL = "http://localhost:3000/api";

export interface Result<T> {
	success: boolean;
	data: T;
}

export interface LoginPayload {
	token: string;
	ruolo: RUOLI;
	supervisore: boolean;
}

export { COLORS, API_URL };
