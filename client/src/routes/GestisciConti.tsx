import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components"
import ItemOrdineTavolo from "../components/ItemOrdineTavolo";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import WelcomePanel from "../components/WelcomePanel";
import { Conto } from "../entities/conto";
import { Controller } from "../entities/controller";
import { getOraMinutiDaDate } from "../utils/utils";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    height: 100%;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    height: 100%;
    padding: 1rem;

    #start_paragraph {
        font-size: 1.5rem;
        font-weight: 600;
        color: #465375;
    }
`;

const StampaButton = styled.button`
    all: unset;
    
    position: absolute;
    bottom: 1rem;
    left: 1.7rem;

    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #3a5fae;
    padding: 0.5rem;
    color: white;
    border-radius: 0.6rem;
    cursor: pointer;

    &:hover {
        background-color: #465375;
    }
    `;

const ELementoOrdinazioneSupervisore = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #263657;
    padding: 1rem;
    border-radius: 0.5rem;
    line-height: 1.2rem;

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
    `;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #465375;
    margin: 1rem 0;
    `;

export default function GestisciContiRoute() {

    const controller = Controller.getInstance();

    const [contoSelezionato, setContoSelezionato] = useState<Conto | undefined>(undefined);

    const chiudiEStampaConto = () => {
        controller.chiudiConto(contoSelezionato!);
    }

    const query = useQuery(["conti"], () => {
        return controller.getContiTavoliUltime24h();
    })

    return (
        <Container>
            {NavbarFactory.generateNavbarBackAndMenu(() => {
                setContoSelezionato(undefined);
            })}

            {!contoSelezionato ? (
                <>
                    <WelcomePanel title="Gestione" subtitle="Conti" />
                    <Content>
                        <p id="start_paragraph">Gestione conti tavoli ultime 24h</p>
                        {
                            query.isLoading ? <LoadingCircle position="absolute" /> :
                                (
                                    query.data.data?.map((conto) => (<ItemOrdineTavolo onClick={() => setContoSelezionato(conto)}
                                        conto={conto} chiuso={true} key={conto.data.toString()} />))
                                )
                        }
                    </Content>
                </>
            )

                : (
                    <Content>
                        {
                            contoSelezionato.ordini.map((ordine) => {
                                return (
                                    <ELementoOrdinazioneSupervisore key={ordine.timestamp.toString()}>
                                        <div>
                                            <p>{getOraMinutiDaDate(ordine.timestamp)}</p>
                                            <sub>Contiene {ordine.elementi.length} elementi</sub>
                                        </div>
                                        <span>€{ordine.getImporto()}</span>
                                    </ELementoOrdinazioneSupervisore>
                                )
                            })
                        }
                        <div>
                            <Divider />
                            <p>Importo totale: €{contoSelezionato.getImportoTotale()}</p>
                            <p>Quantità piatti ordinati: {contoSelezionato.getTotaleElementi()}</p>
                        </div>
                        <StampaButton onClick={chiudiEStampaConto}>Chiudi e Stampa Conto</StampaButton>
                    </Content>
                )}
        </Container>
    )
}
