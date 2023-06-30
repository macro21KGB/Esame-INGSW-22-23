import { Ordinazione } from "../../entities/ordinazione";
import styled from "styled-components";
import { getOraMinutiDaDate } from "../../utils/functions";
import { useState } from "react";
interface EOSProps {
    ordine: Ordinazione;
}

const Container = styled.button`
    all: unset;

    background-color: #263657;
    padding: 1rem;
    border-radius: 0.5rem;
    line-height: 1.2rem;
    margin: 0.5rem 0;

    
`;

const DescrizioneOrdinazione = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    p {
        margin: 0;
        font-weight: 600;
        font-size: 1.2rem;
    }

    sub {
        font-style: italic;
        font-size: 0.8rem;
    }

    span {
        font-size: 1.5rem;
        font-weight: 400;
    }

    svg {
        width: 1.5rem;
    }
    `;

const ElementoOrdinazioneBreve = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0.5rem 0;
    background-color: #324875;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;

    p {
        margin: 0;
    }
    
    `;

export default function ELementoOrdinazioneSupervisore({ ordine }: EOSProps) {

    const [mostraElementi, setMostraElementi] = useState(false);

    return (
        <Container onClick={() => setMostraElementi(!mostraElementi)}>
            <DescrizioneOrdinazione>
                <div>
                    <p>{getOraMinutiDaDate(ordine.timestamp)}</p>
                    <sub>Contiene {ordine.elementi.length} elementi</sub>
                </div>
                <span>€{ordine.elementi.reduce((prev, curr) => {
                    return prev + curr.prezzo * curr.quantita;
                }, 0)}
                </span>
                <span>
                    {mostraElementi ?
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>

                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>


                        )
                    }
                </span>
            </DescrizioneOrdinazione>
            {mostraElementi && <div>
                {ordine.elementi.map((el, i) => {
                    return (
                        <ElementoOrdinazioneBreve key={el.nome}>
                            <p><strong>{el.quantita}x</strong> {el.nome}</p>
                            <span>€{el.prezzo}</span>
                        </ElementoOrdinazioneBreve>
                    )
                })}
            </div>}
        </Container>
    )

}