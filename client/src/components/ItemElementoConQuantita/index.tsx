import { useState } from "react";
import styled from "styled-components";
import { Elemento } from "../../entities/menu";

interface ItemElementoCategoriaProps {
	elemento: Elemento;
	quantita: number;
	onChangeQuantita: (elemento: Elemento, quantita: number) => void;
}

const ItemElementoCategoriaContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	min-height: 5rem;
	background: linear-gradient(101.52deg, #263657 5.56%, #465375 93.24%);
	border-radius: 0.5rem;
	padding: 0.2rem 1rem;

	.info {
		display: flex;
		flex-direction: column;
		line-height: 1.2rem;
		flex-wrap: wrap;
	}

	.prezzo {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-end;
		width: 5rem;
	}

    .quantita {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
        margin: 0.5rem 0;
        text-align: center;
    }

	strong {
		font-size: 1.5rem;
		font-weight: bold;
		color: white;
	}	

	button {
		all: unset;
		cursor: pointer;
		font-size: 1.5rem;
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
	
		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
		}
	}

	sub {
		font-style: italic;
	}
`;

export default function ItemElementoConQuantita({
	elemento,
	quantita,
	onChangeQuantita,
}: ItemElementoCategoriaProps) {
	const [quantitaDisplay, setQuantitaDisplay] = useState(quantita);

	const onChangeQuantitaDisplay = (quantita: number) => {
		if (quantita < 0) {
			quantita = 0;
		}

		setQuantitaDisplay(quantita);
		onChangeQuantita(elemento, quantita);
	};

	return (
		<ItemElementoCategoriaContainer>
			<div className="info">
				<strong>{elemento.nome}</strong>
				<sub>{elemento.descrizione}</sub>
				{elemento.allergeni.map((allergene) => (
					<div>
						<strong>{allergene.nome}</strong>
					</div>
				))}
			</div>
			<div className="prezzo">
				<strong>€{elemento.prezzo}</strong>
			</div>

			<div className="quantita">
				<button onClick={() => onChangeQuantitaDisplay(quantitaDisplay + 1)}>
					+
				</button>
				<strong>{quantitaDisplay}</strong>
				<button onClick={() => onChangeQuantitaDisplay(quantitaDisplay - 1)}>
					-
				</button>
			</div>
		</ItemElementoCategoriaContainer>
	);
}
