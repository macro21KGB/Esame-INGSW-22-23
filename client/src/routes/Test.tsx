import ItemOrdinazione from "../components/ItemOrdinazione";
import { Allergene } from "../entities/allergene";
import { ElementoConQuantita } from "../entities/menu";
import { Ordinazione } from "../entities/ordinazione";

export default function TestRoute() {
	const elementoConQuantita: ElementoConQuantita = new ElementoConQuantita(
		"Pasta",
		"Pasta all'uovo",
		5,
		["uovo", "farina"],
		[new Allergene("Glutine")],
		2,
	);

	const ordinazione: Ordinazione = new Ordinazione(
		"1",
		new Date(),
		null,
		false,
		[elementoConQuantita],
	);

	return (
		<>
			<ItemOrdinazione ordinazione={ordinazione} />
		</>
	);
}
