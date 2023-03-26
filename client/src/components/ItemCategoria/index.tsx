import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Categoria } from "../../entities/menu";

interface ItemCategoriaProps {
	categoria: Categoria;
	onClickUp: () => void;
	onClickDown: () => void;
}

const ItemCategoriaContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
    background-color: #465375;
    border-radius: 0.5rem;
    padding: 0.2rem 1rem;

    p {
        font-size: 1.5rem;
        font-weight: bold;
        color: white;
        min-width: 14rem;
    }


    #buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    
        button {
            all: unset;
            font-size: 1.5rem;
        }
    }

    `;

export default function ItemCategoria({
	categoria,
	onClickDown,
	onClickUp,
}: ItemCategoriaProps) {
	const params = useParams<{ id: string }>();

	return (
		<ItemCategoriaContainer>
			<Link to={`/dashboard/${params.id}/menu/${categoria.nome}`}>
				<p>{categoria.nome}</p>
			</Link>
			<div id="buttons">
				<button onClick={onClickUp} type="button">
					⬆️
				</button>
				<button onClick={onClickDown} type="button">
					⬇️
				</button>
			</div>
		</ItemCategoriaContainer>
	);
}
