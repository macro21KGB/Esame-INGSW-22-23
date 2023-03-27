import styled from "styled-components";
import { Categoria, Elemento } from "../../entities/menu";

interface ItemElementoCategoriaProps {
	elemento: Elemento;
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

	strong {
		font-size: 1.5rem;
		font-weight: bold;
		color: white;
	}	

	sub {
		font-style: italic;
	}
`;

export default function ItemElementoCategoria({
	elemento,
}: ItemElementoCategoriaProps) {
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
		</ItemElementoCategoriaContainer>
	);
}
