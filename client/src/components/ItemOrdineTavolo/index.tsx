import styled from "styled-components";
import { Conto } from "../../entities/conto";

interface ItemOrdineTavoloProps {
    conto: Conto;
    chiuso: boolean;
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #263657;
    padding: 0;
    margin: 0;
    height: 3rem;
    border-radius: 0.8rem;
    padding-left: 1rem;


    p {
        margin: 0;
    }
`;

const ContoLabel = styled.div<{ chiuso: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 200;
    height: inherit;
    width: 4rem;
    text-align: center;
    line-height: 1rem;
    padding: 0 0.5rem;
    justify-content: center;
    border-radius: 0 0.8rem 0.8rem 0;
    background-color: ${(props) => (props.chiuso ? "#eebb08" : "green")};
    color: ${(props) => (props.chiuso ? "black" : "white")};
    `;


export default function ItemOrdineTavolo({ conto, chiuso }: ItemOrdineTavoloProps) {
    return (
        <Container>
            <p>{conto.codice_tavolo}</p>
            <ContoLabel chiuso={chiuso}>{chiuso ? "CONTO CHIUSO" : "IN CORSO"}</ContoLabel>
        </Container>
    )
}