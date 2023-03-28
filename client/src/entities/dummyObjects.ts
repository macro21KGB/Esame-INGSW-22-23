import { Conto } from "./conto";
import { Categoria, Elemento, ElementoConQuantita } from "./menu";
import { Ordinazione } from "./ordinazione";
import { Ristorante } from "./ristorante";
import {
	AdminFactory,
	Cameriere,
	RUOLI,
	Ruolo,
	Utente,
	UtenteFactory,
} from "./utente";

const dummyResturant = new Ristorante(
	1,
	"Ristorante",
	"Via Roma",
	"1234567890",
	"www.ristorante.it",
	"img/ristorante.jpg",
	{ camerieri: [], addettiAllaCucina: [] },
);

const dummyConto = new Conto(new Date(), "Tavolo 23", []);

const dummyAdmin = UtenteFactory.creaUtente(
	"Mario",
	"Rossi",
	"1234567890",
	"mario.rossi@email.com",
	RUOLI.ADMIN,
);

const dummyCategoria = new Categoria("Primi", [], 0);

const dummyElemento = new Elemento(
	"Pasta al forno",
	"Pasta fatta al forno",
	7,
	{
		ingredienti: [],
		allergeni: [],
		ordine: 0,
	},
);

const dummyElementoConQuantita = ElementoConQuantita.fromElemento(
	dummyElemento,
	2,
);

const dummyOrdinazione = new Ordinazione("23").setElementi([
	dummyElementoConQuantita,
]);
const dummyOrdinazioneEvasa = new Ordinazione("23")
	.setElementi([dummyElementoConQuantita])
	.setEvasaDa(dummyAdmin as Cameriere);

export {
	dummyResturant,
	dummyOrdinazione,
	dummyAdmin,
	dummyCategoria,
	dummyElemento,
	dummyElementoConQuantita,
	dummyOrdinazioneEvasa,
	dummyConto
};
