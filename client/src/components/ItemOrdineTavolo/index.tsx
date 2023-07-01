import styled from "styled-components";
import { Conto } from "../../entities/conto";
import { useEffect } from "react";
import { getOraMinutiDaDate } from "../../utils/functions";

interface ItemOrdineTavoloProps {
    conto: Conto;
    onClick?: () => void;
}

const Container = styled.div`
    all: unset;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background-color: #263657;
    padding: 0;
    margin: 0;
    margin-bottom: 1rem;
    height: 3rem;
    border-radius: 0.8rem;
    padding-left: 1rem;
    cursor: pointer;
    
    span {
        margin: 0;
        font-style: italic;
    }

    p {
        margin: 0;
    }
`;

const ContoLabel = styled.div<{ chiuso: boolean }>`

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    font-weight: 200;
    height: inherit;
    width: 4rem;
    text-align: center;
    line-height: 1rem;

    padding: 0 0.5rem;
    border-radius: 0 0.8rem 0.8rem 0;
    background-color: ${(props) => (props.chiuso ? "#eebb08" : "green")};
    color: ${(props) => (props.chiuso ? "black" : "white")};
    `;


export default function ItemOrdineTavolo({ conto, onClick }: ItemOrdineTavoloProps) {

    return (
        <Container onClick={onClick}>
            <p>Tavolo {conto.codice_tavolo}</p>
            <span>{getOraMinutiDaDate(conto.ordini[0].timestamp)}</span>
            <ContoLabel chiuso={conto.chiuso}>{conto.chiuso ? "CONTO CHIUSO" : "IN CORSO"}</ContoLabel>
        </Container>
    )
}