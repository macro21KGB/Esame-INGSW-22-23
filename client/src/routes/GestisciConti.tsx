import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components"
import ItemOrdineTavolo from "../components/ItemOrdineTavolo";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import WelcomePanel from "../components/WelcomePanel";
import { Conto } from "../entities/conto";
import { Controller } from "../entities/controller";
import { useStore } from "../stores/store";
import { getOraMinutiDaDate, scriviContoSuPDF } from "../utils/utils";
import ELementoOrdinazioneSupervisore from "../components/ElementoOrdinazioneSupervisore";

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

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #465375;
    margin: 1rem 0;
    `;

export default function GestisciContiRoute() {

    const controller = Controller.getInstance();

    const [contoSelezionato, setContoSelezionato] = useState<Conto | undefined>(undefined);
    const idRistorante = useStore(state => state.idRistorante)

    const chiudiEStampaConto = () => {
        controller.chiudiConto(contoSelezionato!);
        scriviContoSuPDF(contoSelezionato!);
    }

    const query = useQuery(["conti"], () => {
        return controller.getContiTavoliUltime24h(idRistorante ?? 0);
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
                            query.isLoading ? <LoadingCircle loaderPosition="absolute" /> :
                                (
                                    query.data?.map((conto) => (<ItemOrdineTavolo onClick={() => setContoSelezionato(conto)}
                                        conto={conto} chiuso={true} key={conto.codice_tavolo} />))
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
                                    <ELementoOrdinazioneSupervisore ordine={ordine} key={ordine.timestamp.toString()} />
                                )

                            })
                        }
                        <div>
                            <Divider />
                            <p>Importo totale: €{contoSelezionato.ordini.reduce((prev, curr) => {
                                return prev + curr.elementi.reduce((prev, curr) => {
                                    return prev + curr.prezzo * curr.quantita;
                                }, 0);
                            }, 0)}</p>
                            <p>Quantità piatti ordinati: {contoSelezionato.ordini.reduce((prev, curr) => {
                                return prev + curr.elementi.length;
                            }, 0)}</p>
                        </div>
                        <StampaButton onClick={chiudiEStampaConto}>Chiudi e Stampa Conto</StampaButton>
                    </Content>
                )}
        </Container>
    )
}
