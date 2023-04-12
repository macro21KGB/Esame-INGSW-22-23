import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell, Bar, Tooltip } from "recharts";
import styled from "styled-components"
import DropDownItem from "../components/DropDownItem";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import SoftButton from "../components/SoftButton";
import WelcomePanel from "../components/WelcomePanel";
import { Controller } from "../entities/controller";
import { Result } from "../utils/constants";
import { prendiInizioEFine as prendiLassoTemporale } from "../utils/utils";
import { useParams } from "react-router";
import { RUOLI } from "../entities/utente";
import { toast } from "react-toastify";

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;


    height: 100%;
    margin: 0;
    padding: 0 0.5rem;

    #options {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        margin: 0.5rem 0;

        div:first-child {
            display: flex;
            flex-direction: row;
        }

        div:last-child {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
        }
    }
`;

const OptionDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 0.5rem;
`;


export default function StatisticheRoute() {

    const [selectedEmailUser, setSelected] = useState("");
    const queryClient = useQueryClient();

    const { id } = useParams();

    const fromInputRef = useRef<HTMLInputElement>(null);
    const toInputRef = useRef<HTMLInputElement>(null);

    const controller = Controller.getInstance();
    const [timeSpan, setTimeSpan] = useState<{ from: Date, to: Date }>({
        from: new Date(),
        to: new Date()
    })

    const queryUtenti = useQuery(["utenti", "cucina"], async () => {
        if (id === undefined) return [];
        const utenti = await controller.getUtenti(+id);
        return utenti.filter(utente => utente.ruolo != RUOLI.ADDETTO_CUCINA);
    });

    useEffect(() => {
        const today = new Date();
        if (fromInputRef.current && toInputRef.current) {
            fromInputRef.current.valueAsDate = today;
            toInputRef.current.valueAsDate = today;
        }
    }, [])

    useEffect(() => {
        if (fromInputRef.current && toInputRef.current) {
            fromInputRef.current.valueAsDate = timeSpan.from;
            toInputRef.current.valueAsDate = timeSpan.to;
        }
    }, [timeSpan]);


    const queryOrdiniEvasi = useQuery<{ giorno: string, numero_ordini: number }[]>(["ordini", "evasi", selectedEmailUser], () => {
        return controller.getNumeroOrdiniEvasiPerUtente(selectedEmailUser, timeSpan.from, timeSpan.to);
    },
        {
            enabled: selectedEmailUser !== "" && selectedEmailUser !== "0",
        }
    );

    const mutationAggiornaTimeSpan = useMutation((newTimeSpan: { from: Date, to: Date }) => {
        setTimeSpan(newTimeSpan);
        return controller.getNumeroOrdiniEvasiPerUtente(selectedEmailUser, newTimeSpan.from, newTimeSpan.to);
    },
        {
            onSettled: () => {
                queryClient.invalidateQueries(["ordini", "evasi", selectedEmailUser]);
            },
            onSuccess: (data) => {
                queryClient.setQueryData(["ordini", "evasi", selectedEmailUser], data);

            },
            onError: (error) => {
                console.log(error);
                toast.error("Errore nel caricamento dei dati");
            }
        }
    );

    const aggiornaTimeSpan = (newTimeSpan: { from: Date, to: Date }) => {
        console.log(newTimeSpan);
        mutationAggiornaTimeSpan.mutate(newTimeSpan);
    }

    return (
        <DashboardContainer>
            <>
                {NavbarFactory.generateNavbarBackAndMenu()}
                <WelcomePanel title="Visualizza" subtitle="Statistiche" />
                {queryUtenti.isLoading ? <LoadingCircle loaderPosition="absolute" /> : (
                    <OptionDiv>
                        <DropDownItem onChange={(e) => { setSelected(e.target.value) }}>
                            <option value="0">Seleziona Addetto alla cucina</option>
                            {queryUtenti.data?.map((utente) =>
                                <option key={utente.email} value={utente.email}>{utente.nome} {utente.cognome}</option>
                            )}

                        </DropDownItem >

                    </OptionDiv>
                )
                }

                {queryOrdiniEvasi.isLoading && <LoadingCircle loaderPosition="absolute" />}

                {queryOrdiniEvasi.data &&
                    <>
                        <div id="options">
                            <div>
                                <SoftButton onClick={() => { aggiornaTimeSpan(prendiLassoTemporale("week")) }} text="Questa settimana" />
                                <SoftButton onClick={() => { aggiornaTimeSpan(prendiLassoTemporale("month")) }} text="Questo mese" />
                                <SoftButton onClick={() => { aggiornaTimeSpan(prendiLassoTemporale("year")) }} text="Questo anno" />
                            </div>
                            <div>
                                <label htmlFor="from">From</label>
                                <input ref={fromInputRef} onChange={(e) => {
                                    setTimeSpan({
                                        from: new Date(e.target.value),
                                        to: timeSpan.to
                                    })
                                }} name="from" type="date" />

                                <label htmlFor="to">To</label>
                                <input ref={toInputRef} onChange={(e) => {
                                    setTimeSpan({
                                        from: timeSpan.from,
                                        to: new Date(e.target.value),
                                    })
                                }} name="to" type="date" />
                            </div>
                        </div>
                        <ResponsiveContainer width="95%" >
                            <BarChart width={730} height={250} data={queryOrdiniEvasi.data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="giorno" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="numero_ordini" name="Numero Ordini" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </>
                }

            </>
        </DashboardContainer>
    )
}