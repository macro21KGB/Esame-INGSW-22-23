import styled from "styled-components";
import { Ristorante } from "../../entities/ristorante";

const ItemRistoranteContainer = styled.button`
    
    all:unset;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    color: white;
    border-radius: 0.5rem;
    background: linear-gradient(101.52deg, #263657 5.56%, #465375 93.24%);
    width: 100%;
    overflow: hidden;
    max-height: 5rem;

    cursor: pointer;

    p {
        font-size: 2rem;
        font-weight: bold;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-inline-size: 12ch;

    }

    sub {
        font-size: 1.2rem;
        font-weight: 100;
        margin: 0;
        font-style: italic;
    }

    #infos {
        padding: 0.5rem;
        line-height: 1.5rem;
    }
    
    img {
        width: 5rem;
        height: 5rem;
    }

    @media screen and (min-width: 600px) {
    
        p {
            max-inline-size: 30ch;
        }
    }
`;

interface ItemRistoranteProps {
    ristorante: Ristorante;
    onClick: () => void;
}

export default function ItemRistorante({
    ristorante,
    onClick,
}: ItemRistoranteProps) {
    return (
        <ItemRistoranteContainer
            onClick={() => {
                onClick();
            }}
            type="button"
        >
            <div id="infos">
                <p>{ristorante.nome}</p>
                <sub>{ristorante.indirizzo}</sub>
            </div>
            <img src={`https://ui-avatars.com/api/?background=random&name=${ristorante.nome.replace(/ /g, "+")}`} alt="" />
        </ItemRistoranteContainer>
    );
}
