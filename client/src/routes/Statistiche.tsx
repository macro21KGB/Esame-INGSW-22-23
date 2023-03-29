import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell, Bar, Tooltip } from "recharts";
import styled from "styled-components"
import DropDownItem from "../components/DropDownItem";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import SoftButton from "../components/SoftButton";
import WelcomePanel from "../components/WelcomePanel";
import { Controller } from "../entities/controller";
import { Result } from "../utils/constants";
import { prendiInizioEFine } from "../utils/utils";

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

export default function StatisticheRoute() {

    const [selectedEmailUser, setSelected] = useState("");
    const queryClient = useQueryClient();

    const fromInputRef = useRef<HTMLInputElement>(null);
    const toInputRef = useRef<HTMLInputElement>(null);

    const controller = Controller.getInstance();
    const [timeSpan, setTimeSpan] = useState<{ from: Date, to: Date }>({
        from: new Date(),
        to: new Date()
    })

    const query = useQuery(["utenti", "cucina"], () => {
        return controller.getUtenti();
    });

    useEffect(() => {
        if (fromInputRef.current && toInputRef.current) {
            fromInputRef.current.valueAsDate = timeSpan.from;
            toInputRef.current.valueAsDate = timeSpan.to;
        }
    }, [timeSpan]);


    const queryOrdiniEvasi = useQuery<Result<{ giorno: string, evasi: number }[]>>(["ordini", "evasi", selectedEmailUser], () => {
        return controller.getNumeroOrdiniEvasiPerUtente(selectedEmailUser, timeSpan.from, timeSpan.to);
    },
        {
            enabled: selectedEmailUser !== "" && selectedEmailUser !== "0",
        }
    );

    const aggiornaTimeSpan = (newTimeSpan: { from: Date, to: Date }) => {
        setTimeSpan(newTimeSpan);
        queryClient.invalidateQueries(["ordini", "evasi", selectedEmailUser]);
    }

    return (
        <DashboardContainer>
            <>
                {NavbarFactory.generateNavbarBackAndMenu()}
                <WelcomePanel title="Visualizza" subtitle="Statistiche" />
                {query.isLoading ? <LoadingCircle position="absolute" /> : (
                    <>
                        <DropDownItem onChange={(e) => { setSelected(e.target.value) }}>
                            <option value="0">Seleziona Addetto alla cucina</option>
                            {query.data?.map((utente) =>
                                <option key={utente.email} value={utente.email}>{utente.nome} {utente.cognome}</option>
                            )}

                        </DropDownItem >

                    </>
                )
                }

                {queryOrdiniEvasi.isLoading && <LoadingCircle position="absolute" />}

                {queryOrdiniEvasi.data?.data &&
                    <>
                        <div id="options">
                            <div>
                                <SoftButton onClick={() => { aggiornaTimeSpan(prendiInizioEFine("week")) }} text="Questa settimana" />
                                <SoftButton onClick={() => { aggiornaTimeSpan(prendiInizioEFine("month")) }} text="Questo mese" />
                                <SoftButton onClick={() => { aggiornaTimeSpan(prendiInizioEFine("year")) }} text="Questo anno" />
                            </div>
                            <div>
                                <label htmlFor="from">From</label>
                                <input ref={fromInputRef} onChange={(e) => {
                                    setTimeSpan({
                                        from: new Date(e.target.value),
                                        ...timeSpan
                                    })
                                }} name="from" type="date" />

                                <label htmlFor="to">To</label>
                                <input ref={toInputRef} onChange={(e) => {
                                    setTimeSpan({
                                        to: new Date(e.target.value),
                                        ...timeSpan
                                    })
                                }} name="to" type="date" />
                            </div>
                        </div>
                        <ResponsiveContainer width="95%" >
                            <BarChart width={730} height={250} data={queryOrdiniEvasi.data?.data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="giorno" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="evasi" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </>
                }

            </>
        </DashboardContainer>
    )
}