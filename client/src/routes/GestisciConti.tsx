import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components"
import ItemOrdineTavolo from "../components/ItemOrdineTavolo";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import WelcomePanel from "../components/WelcomePanel";
import { Conto } from "../entities/conto";
import { Controller } from "../entities/controller";
import { useStore } from "../stores/store";
import { getOraMinutiDaDate, isContoClosed as isContoChiuso, scriviContoSuPDF } from "../utils/functions";
import ELementoOrdinazioneSupervisore from "../components/ElementoOrdinazioneSupervisore";
import { toast } from "react-toastify";
import { logEventToFirebase } from "../firebase";
import { AppEvents } from "../utils/constants";
import { useNavigate } from "react-router";

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
    padding: 1rem;

    #start_paragraph {
        font-size: 1.5rem;
        font-weight: 600;
        color: #465375;
    }

    #apertura_conto {
        font-size: 1.2rem;
        font-weight: 600;
        color: #465375;
        font-style: italic;
    }
    
`;

const StampaButton = styled.button`
    all: unset;
    
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
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [contoSelezionato, setContoSelezionato] = useState<Conto | undefined>(undefined);
    const idRistorante = useStore(state => state.idRistorante)

    const mutationChiudiConto = useMutation((conto: Conto & { id_conto: number }) => {
        return controller.chiudiConto(conto.id_conto);
    }, {
        onSuccess: (success) => {
            if (success) {
                setContoSelezionato(undefined);
                toast.success("Conto chiuso con successo");
                queryClient.invalidateQueries(["conti"]);
            } else {
                toast.error("Errore durante la chiusura del conto");
            }
        }, onError: () => {
            toast.error("Errore durante la chiusura del conto");
        }
    });

    const chiudiEStampaConto = () => {
        if (!contoSelezionato) return;
        logEventToFirebase(AppEvents.PRINT_ORDER)
        mutationChiudiConto.mutate(contoSelezionato as Conto & { id_conto: number });
        scriviContoSuPDF(contoSelezionato!);
    }

    const query = useQuery(["conti"], () => {
        return controller.getContiTavoliUltime24h(idRistorante ?? 0);
    })

    return (
        <Container>
            {NavbarFactory.generateNavbarBackAndMenu(() => {
                if (contoSelezionato) {
                    setContoSelezionato(undefined);
                } else {
                    navigate("/supervisore");
                }

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
                                        conto={conto} key={conto.codice_tavolo} />))
                                )
                        }
                    </Content>
                </>
            )

                : (
                    <Content>
                        <WelcomePanel title="Riepligo Conto" subtitle={`Tavolo ${contoSelezionato.codice_tavolo}`} />
                        <sub id="apertura_conto">Conto aperto alle {getOraMinutiDaDate(contoSelezionato.data)}</sub>

                        {
                            contoSelezionato.ordini.map((ordine) => {
                                return <ELementoOrdinazioneSupervisore ordine={ordine} key={ordine.timestamp.toString()} />
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

                        {
                            !contoSelezionato.chiuso &&
                            <StampaButton onClick={chiudiEStampaConto}>Chiudi e Stampa Conto</StampaButton>
                        }
                    </Content>
                )}
        </Container>
    )
}
