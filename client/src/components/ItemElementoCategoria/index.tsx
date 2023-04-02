import styled from "styled-components";
import { Categoria, Elemento } from "../../entities/menu";

interface ItemElementoCategoriaProps {
	elemento: Elemento;
	onClickUp?: () => void;
	onClickDown?: () => void;
	onClickElemento: (elemento: Elemento) => void;
	ordine?: number;
}

const ItemElementoCategoriaContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	min-height: 5rem;
	background: linear-gradient(101.52deg, #263657 5.56%, #465375 93.24%);
	border-radius: 0.5rem;
	padding: 0.5rem 0.5rem;

	-webkit-tap-highlight-color: transparent;


	.info {
		display: flex;
		flex-direction: column;
		line-height: 1.4rem;
		flex-wrap: wrap;
		cursor: pointer;
		width: 100%;

		strong {
			margin-bottom: 0.3rem;
			font-size: 1.3rem;
		}

		sub {
			line-height: 1rem;
		}
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

	.price_buttons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

	}
`;

const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	height: 100%;
	gap: 0.5rem;
	margin-left: 1rem;

	button {
		all: unset;
		border-radius: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.5);
		width: 1.5rem;
		height: 1.5rem;

		display: flex;
		justify-content: center;
		align-items: center;
		
		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}

		svg {
			width: 1rem;
		}

	}

`;

const AllergeneContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 0.5rem;
	margin: 0.5rem;
	margin-left: 0;
	flex-wrap: wrap;
	
`;


const AllergeneSub = styled.sub`
	background-color: #778fc1;
	color: white;
	padding: 0.1rem 0.5rem;
	border-radius: 0.5rem;
	width: fit-content;
	`;

export default function ItemElementoCategoria({
	elemento, onClickDown, onClickUp, onClickElemento, ordine
}: ItemElementoCategoriaProps) {
	return (
		<ItemElementoCategoriaContainer >

			<div className="info" onClick={() => {
				onClickElemento(elemento);
			}}>
				<strong>{elemento.nome}</strong>
				<sub>{elemento.descrizione}</sub>
				{elemento.allergeni?.length > 0 &&
					<AllergeneContainer>
						{elemento.allergeni?.map((allergene) => (
							<AllergeneSub key={allergene.nome}>
								{allergene.nome}
							</AllergeneSub>
						))}
					</AllergeneContainer>
				}
			</div>

			<div className="prezzo" onClick={() => { onClickElemento(elemento) }}>
				<strong>€{elemento.prezzo}</strong>
			</div>
			<ButtonsContainer>
				<button onClick={onClickUp}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
					</svg>
				</button>

				<button onClick={onClickDown}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
					</svg>
				</button>

			</ButtonsContainer>
		</ItemElementoCategoriaContainer>
	);
}
