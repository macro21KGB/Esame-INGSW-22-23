import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Categoria } from "../../entities/menu";

interface ItemCategoriaProps {
    categoria: Categoria;
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
}: ItemCategoriaProps) {

    const params = useParams<{ id: string }>() || { id: "" };

    return (
        <Link to={`/dashboard/${params.id}/menu/${categoria.id_categoria}`}>
            <ItemCategoriaContainer>
                <p>{categoria.nome}</p>
            </ItemCategoriaContainer>
        </Link>
    );
}
