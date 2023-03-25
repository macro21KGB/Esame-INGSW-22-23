import { Ordinazione } from "./ordinazione";
import { Ristorante } from "./ristorante";
import { Ruolo, Utente } from "./utente";

const dummyResturant = new Ristorante(
	1,
	"Ristorante",
	"Via Roma",
	"1234567890",
	"www.ristorante.it",
	"img/ristorante.jpg",
	{ camerieri: [], addettiAllaCucina: [] },
);

const dummyAdmin = new Utente(
	"Mario",
	"Rossi",
	"1234567890",
	"mario.rossi@email.com",
	Ruolo.ADMIN,
);

const dummyOrdinazione = new Ordinazione("23");

export { dummyResturant, dummyOrdinazione, dummyAdmin };
