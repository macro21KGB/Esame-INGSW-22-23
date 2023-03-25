import { Ordinazione } from "./ordinazione";
import { Ristorante } from "./ristorante";
import { Ruolo, Utente } from "./utente";

const dummyResturant = new Ristorante(
	"Ristorante",
	"Via Roma",
	"1234567890",
	"www.ristorante.it",
	"img/ristorante.jpg",
	{ camerieri: [], addettiAllaCucina: [] },
);

const dummyAdmin = new Utente(
	"Admin",
	"Amdmin",
	"1234567890",
	"email@email.com",
	Ruolo.ADMIN,
);

const dummyOrdinazione = new Ordinazione("23");

export { dummyResturant, dummyOrdinazione, dummyAdmin };
