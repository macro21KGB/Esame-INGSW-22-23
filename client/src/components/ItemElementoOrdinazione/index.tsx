import React from "react";
import { ElementoConQuantita } from "../../entities/menu";

interface ItemElementoOrdinazioneProps {
	elemento: ElementoConQuantita;
}

export default function ItemElementoOrdinazione({ elemento }: ItemElementoOrdinazioneProps) {

	return (
		<div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
			{elemento.quantita}x {elemento.nome}
		</div>
	);
}
